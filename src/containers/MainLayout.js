import {Heading, Pane, SidebarTab, TabNavigation, Text} from "evergreen-ui";
import React from "react";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import HeadingSecondary from "../components/Heading/HeadingSecondary";
import pages from "../static/pages";
import {setActiveProject} from "../store/components/projects/projects.actions";

const MainLayoutContainer = ({tabs = pages, pages: _pages, projects, setActiveProject, flexDirection = "column", alignItems = "flex-start", children}) => {
	const {pathname} = useLocation();
	const availableTabs = tabs.filter(tab => _pages[tab.title] || tab.title === "Settings");
	const _projects = Object.values(projects.order).map(projectId => ({label: projects.list[projectId].name, value: projectId}));

	return (
		<Pane background="tint1" borderRadius={3} display="flex" height="100%">
			<Pane background="blueTint" display="flex" flexDirection="column" flexGrow={1} maxWidth="25%">
				<Heading is="h5" marginBottom={32} marginTop={32} size={100}>
					dev-tools
				</Heading>

				<TabNavigation marginBottom="auto">
					{availableTabs.map((tab, index) => (
						<SidebarTab key={tab.url} href={tab.url} id={tab} is="a" isSelected={pathname === tab.url} paddingLeft={0}>
							{tab.title}
						</SidebarTab>
					))}
				</TabNavigation>

				<Pane alignItems="center" display="flex" flexDirection="column" marginBottom={16}>
					<HeadingSecondary text="Projects" />

					<Pane display="flex" justifyContent="center">
						{_projects.map(({label, value}) => (
							<Text
								key={value}
								color="#1070ca"
								cursor="pointer"
								fontSize={12}
								fontWeight={value === projects.activeProject ? 600 : 300}
								marginBottom={4}
								marginLeft={5}
								marginRight={5}
								marginTop={2}
								onClick={() => setActiveProject(value)}
								size={300}
							>
								{label}
							</Text>
						))}
					</Pane>
				</Pane>
			</Pane>

			<Pane alignItems={alignItems} border="muted" display="flex" flex={4} flexDirection={flexDirection} overflowY="scroll">
				{children}
			</Pane>
		</Pane>
	);
};
const mapStateToProps = ({pages, projects}) => ({pages, projects});
const mapDispatchToProps = {setActiveProject};
export default connect(mapStateToProps, mapDispatchToProps)(MainLayoutContainer);

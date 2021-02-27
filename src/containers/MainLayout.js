import {Heading, Pane, SidebarTab, TabNavigation} from "evergreen-ui";
import React from "react";
import {useLocation} from "react-router-dom";

const MainLayoutContainer = ({
	tabs = [
		{title: "Home", url: "/"},
		{title: "Copy Tool", url: "/copy-tool"},
		{title: "Extract Tool", url: "/extract-tool"},
		{title: "Boilerplate", url: "/boilerplate"},
		{title: "Components", url: "/components"},
		{title: "Hooks", url: "/hooks"},
	],
	flexDirection = "column",
	alignItems = "flex-start",
	children,
}) => {
	const {pathname} = useLocation();
	return (
		<Pane background="tint1" borderRadius={3} display="flex" height="100%">
			<Pane background="blueTint" flex={1}>
				<Heading is="h5" marginBottom={32} marginTop={32} size={100}>
					dev-tools
				</Heading>

				<TabNavigation marginBottom={16}>
					{tabs.map((tab, index) => (
						<SidebarTab key={tab.url} href={tab.url} id={tab} is="a" isSelected={pathname === tab.url} paddingLeft={0}>
							{tab.title}
						</SidebarTab>
					))}
				</TabNavigation>
			</Pane>

			<Pane alignItems={alignItems} border="muted" display="flex" flex={4} flexDirection={flexDirection} overflowY="scroll">
				{children}
			</Pane>
		</Pane>
	);
};
export default MainLayoutContainer;

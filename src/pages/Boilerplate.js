/* eslint-disable react/jsx-newline */
import {Pane, Paragraph, SidebarTab, Table, TabNavigation} from "evergreen-ui";
import React, {useEffect, useReducer} from "react";
import {useLocation} from "react-router-dom";
import CLIText from "../components/CLIText/CLIText";
import DescriptionPrimary from "../components/Description/DescriptionPrimary";
import HeadingFile from "../components/Heading/HeadingFile";
import HeadingInfo from "../components/Heading/HeadingInfo";
import HeadingPrimary from "../components/Heading/HeadingPrimary";
import CodeContainer from "../containers/Code";
import ContentContainer from "../containers/Content";
import MainLayoutContainer from "../containers/MainLayout";
import SidebarContainer from "../containers/Sidebar";
import formReducer from "../reducers/form.reducer";
import tabs from "../static/boilerplate";
import {sampleComponent} from "./literals/Components.literal";
import {eslintConfig} from "./literals/ESLint.literal";
import {sampleHook} from "./literals/Hooks.literal";
import {prettierConfig, prettierGitHooksConfig} from "./literals/Prettier.literal";

const initialFormState = {
	copied: false,
};

const BoilerplatePage = () => {
	const {pathname} = useLocation();
	const [formState, dispatch] = useReducer(formReducer, initialFormState);
	const handleToggle = e => dispatch({type: "TOGGLE", field: e?.target?.name || "copied"});
	useEffect(() => {
		let copyTimeout;
		if (formState.copied) copyTimeout = setTimeout(handleToggle, 2000);
		return () => clearTimeout(copyTimeout);
	}, [formState.copied]);
	return (
		<MainLayoutContainer alignItems="stretch" flexDirection="row">
			<ContentContainer title="Boilerplate">
				{/* <Pane id="home" marginBottom={32}>
					<HeadingPrimary text="Home" />
				</Pane> 
				<hr width="100%" /> */}
				<Pane flexShrink={0} height="auto" marginBottom={32} paddingTop={16} textAlign="left" width="100%">
					<HeadingInfo id="react-components" marginTop={16} paddingTop={16} text="React Basics" />
					<HeadingPrimary text="Components" />
					<DescriptionPrimary content={["Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.", "Conceptually, components are like JavaScript functions."]} />
					<Paragraph color="muted" marginBottom={16}>
						Components accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
					</Paragraph>

					<HeadingFile file="Welcome.jsx" />
					<CodeContainer code={sampleComponent} handleCopy={handleToggle} />
					<HeadingInfo id="react-hooks" marginTop={16} paddingTop={16} text="React Basics" />
					<HeadingPrimary text="Hooks" />

					<DescriptionPrimary content={["Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle.", "Hooks also offer a new powerful way to combine them."]} />
					<Paragraph color="muted" marginBottom={16}>
						With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. Hooks allow you to reuse stateful logic without changing your component hierarchy.
					</Paragraph>

					<HeadingFile file="Example.js" />
					<CodeContainer code={sampleHook} handleCopy={handleToggle} />
				</Pane>
				<hr width="100%" />
				<Pane flexShrink={0} height="auto" marginBottom={32} paddingBottom={16} textAlign="left" width="100%">
					<HeadingPrimary id="prettier" marginTop={16} paddingTop={16} text="Prettier" />
					<DescriptionPrimary content={["Prettier is an opinionated code formatter!", "It removes all original styling and ensures that all outputted code conforms to a consistent style."]} />
					<Paragraph color="muted" marginBottom={16}>
						What usually happens once people are using Prettier is that they realize that they actually spend a lot of time and mental energy formatting their code.
					</Paragraph>

					<HeadingFile file=".prettierrc" />
					<CodeContainer code={prettierConfig} handleCopy={handleToggle} language="json" />

					<HeadingInfo id="prettier-git-hooks" marginTop={16} paddingTop={16} text="Prettier" />
					<HeadingPrimary text="Git Hooks" />

					<CLIText text="npm install --save-dev prettier lint-staged husky" />

					<DescriptionPrimary content={["You can add the following to your package.json to have ESLint and Prettier run before each commit, via lint-staged and husky."]} />

					<HeadingFile file="package.json" />
					<CodeContainer code={prettierGitHooksConfig} handleCopy={handleToggle} language="json" />
				</Pane>
				<hr width="100%" />
				<Pane alignSelf="stretch" display="flex" flexDirection="column" flexShrink={0} height="auto" id="eslint" marginBottom={32} marginTop={16} paddingTop={16} position="relative" textAlign="left" width="100%">
					<HeadingPrimary text="ES-Lint" />
					<DescriptionPrimary content={["ESLint statically analyzes your code to quickly find problems.", "Many problems ESLint finds can be automatically fixed."]} />
					<Paragraph color="muted" marginBottom={16}>
						ESLint fixes are syntax-aware so you won&apos;t experience errors introduced by traditional find-and-replace algorithms.
					</Paragraph>

					<HeadingFile file=".eslintrc.json" />
					<CodeContainer code={eslintConfig} handleCopy={handleToggle} language="json" />
				</Pane>

				<span />
			</ContentContainer>

			<SidebarContainer>
				<Table.Head width="100%">
					<Table.SearchHeaderCell onChange={value => console.log(value)} placeholder="Search..." />
				</Table.Head>

				<TabNavigation marginBottom="auto" textAlign="left" width="100%">
					{tabs.map((tab, index) => (
						<>
							<SidebarTab key={tab.url} height={24} href={tab.url} id={tab} is="a" isSelected={pathname === tab.url} lineHeight={0.2} marginBottom={2} marginTop={8} paddingLeft={0}>
								{tab.title}
							</SidebarTab>
							{tab?.children?.map(_tab => (
								<SidebarTab key={_tab.url} fontWeight={400} height={24} href={_tab.url} id={_tab} is="a" isSelected={pathname === _tab.url} lineHeight={0.2} marginBottom={2} paddingLeft={16}>
									{_tab.title}
								</SidebarTab>
							))}
						</>
					))}
				</TabNavigation>
			</SidebarContainer>
		</MainLayoutContainer>
	);
};
export default BoilerplatePage;

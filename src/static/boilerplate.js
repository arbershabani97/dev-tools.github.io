export default [
	// {title: "Home", url: "#home"},
	{
		title: "React - Basics",
		url: "#react-components",
		children: [
			{title: "Components", url: "#react-components"},
			{title: "Hooks", url: "#react-hooks"},
		],
	},
	{
		title: "React - Organization",
		url: "#react-containers",
		children: [
			{title: "Containers", url: "#react-containers"},
			{title: "Services", url: "#react-services"},
			{title: "Pages", url: "#react-pages"},
		],
	},
	{
		title: "Redux (State Management)",
		url: "#redux-actions",
		children: [
			{title: "Actions", url: "#redux-actions"},
			{title: "Reducers", url: "#redux-reducers"},
			{title: "Caching (Persist)", url: "#redux-caching"},
			{title: "Config", url: "#redux-config"},
		],
	},
	{
		title: "Prettier",
		url: "#prettier",
		children: [
			{title: "Config", url: "#prettier-prettier"},
			{title: "Git Hooks", url: "#prettier-git-hooks"},
		],
	},
	{title: "ES-Lint", url: "#eslint", children: [{title: "Config", url: "#eslint"}]},
];

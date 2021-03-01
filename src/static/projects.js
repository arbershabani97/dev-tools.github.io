import reactLibraries from "./reactLibraries";
import reactNativeLibraries from "./reactNativeLibraries";

export const defaultProject = {
	id: Math.floor(Math.random() * 10000),
	name: "Default",
	language: "react",

	libraries: reactLibraries,
	stateManagement: {
		redux: true,
		graphql: true,
		context: false,
	},
};

const newProject = (language = "react") => {
	let libraries;
	if (language === "react") libraries = reactLibraries;
	if (language === "react-native") libraries = reactNativeLibraries;

	return {
		id: Math.floor(Math.random() * 10000),
		name: "New",
		language,

		libraries,
		stateManagement: {
			redux: true,
			graphql: true,
			context: false,
		},
	};
};

export default newProject;

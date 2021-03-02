/* eslint-disable prefer-destructuring */
const {replaceAll} = require("./string");

const jsKeywords = [
	"require",
	"import",
	"from",
	"export",
	"const",
	"eslint",
	"state",
	"app",
	"list",
	"index",
	"filtered",
	"disable",
	"max",
	"moment",
	"print",
	"length",
	"if",
	"Number",
	"for",
	"of",
	"forEach",
	"map",
	"data",
	"p",
	"div",
	"img",
	"src",
	"alt",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"input",
	"react",
	"select",
	"redux",
	"any",
	"interface",
	"string",
	"boolean",
	"uuid",
	"React",
	"assets",
	"components",
	"containers",
	"src",
	"component",
	"Component",
	"styled",
	"style",
	"margin",
	"font",
	"background",
	"padding",
	"box",
	"border",
	"color",
	"weight",
	"size",
	"useState",
	"useEffect",
	"value",
	"false",
	"onClick",
	"bottom",
	"name",
	"target",
	"return",
	"componentDidMount",
	"componentDidUpdate",
	"await",
	"break",
	"case",
	"catch",
	"class",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"else",
	"enum",
	"export",
	"extends",
	"false",
	"finally",
	"for",
	"function",
	"if",
	"implements",
	"import",
	"in",
	"instanceof",
	"interface",
	"let",
	"new",
	"null",
	"package",
	"private",
	"protected",
	"public",
	"return",
	"super",
	"switch",
	"static",
	"this",
	"throw",
	"try",
	"True",
	"typeof",
	"var",
	"void",
	"while",
	"with",
	"yield",
	"onChange",
	"handleChange",
	"input",
	"form",
	"div",
];

/* eslint-disable max-statements */
export const nameExtractor = (code = "") => {
	const matchWords = [];
	const mixedWords = {};

	(code.match(/<.*/g) || []).forEach($1 => {
		const element = $1.startsWith("</") ? $1.slice(2) : $1.slice(1);
		const word = element.split(" ")[0].split(">")[0];
		if (word && !matchWords.includes(word)) {
			if (!mixedWords[word]) mixedWords[word] = 0;
			mixedWords[word] += 1;
			if (mixedWords[word] >= 2 && mixedWords[word] >= Math.max(...Object.values(mixedWords)) && !matchWords.includes(word)) matchWords.push(word);
		}
		// Do something with each element
	});
	if (Object.keys(mixedWords).length < 5) {
		(code.match(/[A-Za-z0-9]+/g) || []).forEach($1 => {
			const word = $1;
			if (!Number.isNaN(Number(word)) || !Number.isNaN(Number(word[0]))) return;
			if (jsKeywords.includes(word)) return;

			if (word && !matchWords.includes(word)) {
				if (!mixedWords[word]) mixedWords[word] = 0;
				mixedWords[word] += 1;
				if (mixedWords[word] >= 2 && mixedWords[word] >= Math.max(...Object.values(mixedWords)) && !matchWords.includes(word)) matchWords.push(word);
			}
		});
	}

	let componentName;
	try {
		componentName = code
			.split("export default ")[1]
			.split("(")
			.slice(-1)[0]
			.match(/[A-Za-z]+/)[0];
	} catch (err) {
		// console.error(err);
	}
	try {
		if (!componentName) {
			componentName = code.split("export const ")[1];
			componentName = replaceAll(componentName, ")", ",")
				.split("(")
				.slice(-1)[0]
				.split(",")[0]
				.split(" ")[0]
				.match(/[A-Za-z]+/)[0];
		}
	} catch (err) {
		// console.error(err);
	}
	try {
		if (!componentName) {
			componentName = code.split("export class ")[1];
			componentName = replaceAll(componentName, ")", ",")
				.split("(")
				.slice(-1)[0]
				.split(",")[0]
				.split(" ")[0]
				.match(/[A-Za-z]+/)[0];
		}
	} catch (err) {
		// console.error(err);
	}

	try {
		if (!componentName) {
			componentName = code.split("export {")[1];
			componentName = componentName.split(",")[0].match(/[A-Za-z]+/)[0];
		}
	} catch (err) {
		// console.error(err);
	}

	return componentName ? [componentName, ...matchWords].slice(0, 10) : matchWords.slice(0, 10);
};

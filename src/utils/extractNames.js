/* eslint-disable prefer-destructuring */
const {replaceAll} = require("./string");

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
	let componentName;
	componentName = code
		.split("export default ")[1]
		.split("(")
		.slice(-1)[0]
		.match(/[A-Za-z]+/)[0];
	if (!componentName) {
		componentName = code.split("export const ")[1];
		componentName = replaceAll(componentName, ")", ",")
			.split("(")
			.slice(-1)[0]
			.split(",")[0]
			.split(" ")[0]
			.match(/[A-Za-z]+/)[0];
		if (!componentName) {
			componentName = code.split("export class ")[1];
			componentName = replaceAll(componentName, ")", ",")
				.split("(")
				.slice(-1)[0]
				.split(",")[0]
				.split(" ")[0]
				.match(/[A-Za-z]+/)[0];
		}
	}
	return componentName ? [componentName, ...matchWords] : matchWords;
};

export const capitalize = s => s && s[0].toUpperCase() + s.slice(1);
export const capitalizeInverse = s => s && s[0].toLowerCase() + s.slice(1);

function escapeRegExp(string) {
	// $& means the whole matched string
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export function replaceAll(str = "", match, replacement) {
	return str.replace(new RegExp(escapeRegExp(match), "g"), () => replacement);
}

import {Ability, AbilityBuilder} from "@casl/ability";

// import persistedStore from "../../store";

// const {store} = persistedStore();

// Defines how to detect object's type
function subjectName(item) {
	if (!item || typeof item === "string") return item;
	return item.__type;
}

const ability = new Ability([], {subjectName});

// eslint-disable-next-line max-statements
/*
 * store.subscribe(() => {
 * 	const {projects} = store.getState();
 * 	const project = projects.list[projects.activeProject];
 * 	// console.log("aaa", Math.random());
 * 	ability.update(defineRulesFor(project));
 * });
 */

export const abilityUpdater = project => {
	ability.update(defineRulesFor(project));
};

// eslint-disable-next-line max-statements,complexity
function defineRulesFor(project) {
	const {can, cannot, rules} = new AbilityBuilder();
	if (project) {
		Object.entries(project.libraries).forEach(([library, used]) => {
			used ? can("see", library) : cannot("see", library);
		});
		Object.entries(project.stateManagement).forEach(([library, used]) => {
			used ? can("see", library) : cannot("see", library);
		});
	}

	return rules;
}

export default ability;

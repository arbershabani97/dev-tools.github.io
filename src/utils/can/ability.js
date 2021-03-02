import {Ability, AbilityBuilder} from "@casl/ability";

// Defines how to detect object's type
function subjectName(item) {
	if (!item || typeof item === "string") return item;
	return item.__type;
}

const ability = new Ability([], {subjectName});

export const abilityUpdater = project => {
	ability.update(defineRulesFor(project));
};

// eslint-disable-next-line max-statements,complexity
function defineRulesFor(project) {
	const {can, cannot, rules} = new AbilityBuilder();
	if (project && project.libraries && project.stateManagement) {
		// Project Libraries Rules
		Object.entries(project.libraries).forEach(([library, used]) => {
			used ? can("see", library) : cannot("see", library);
		});
		// Project State Management Rules
		Object.entries(project.stateManagement).forEach(([library, used]) => {
			used ? can("see", library) : cannot("see", library);
		});
	}

	return rules;
}

export default ability;

import _cloneDeep from "lodash/cloneDeep";
import newProject from "../../../static/projects";
import reactLibraries from "../../../static/reactLibraries";
import {SET_PROJECTS, ADD_PROJECT, EDIT_PROJECT, SET_ACTIVE_PROJECT, REMOVE_PROJECT} from "../../actionTypes";

const initialState = {
	list: {
		0: {
			id: 0,
			name: "Default",
			language: "react",

			libraries: reactLibraries,
			stateManagement: {
				redux: true,
				graphql: true,
				context: false,
			},
		},
	},
	activeProject: 0,
	order: [0],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PROJECTS:
			return {
				...action.payload,
			};
		case SET_ACTIVE_PROJECT:
			return {
				...state,
				activeProject: action.payload,
			};

		case ADD_PROJECT:
			const project = newProject("react");
			return {
				...state,
				list: {
					...state.list,
					[project.id]: project,
				},
				order: [...state.order, project.id],
			};

		case EDIT_PROJECT:
			return {
				...state,
				list: {
					...state.list,
					[action.payload.id]: action.payload,
				},
			};

		case REMOVE_PROJECT:
			const newState = _cloneDeep(state);
			delete newState.list[action.payload];
			newState.order = newState.order.filter(id => id !== action.payload);
			// eslint-disable-next-line prefer-destructuring
			if (action.payload === newState.activeProject) newState.activeProject = newState.order[0];
			return newState;

		default:
			return state;
	}
};

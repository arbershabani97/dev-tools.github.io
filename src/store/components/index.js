/* eslint-disable no-undefined */
import {combineReducers} from "redux";
import projects from "./projects/projects.reducers.js";
import pages from "./pages/pages.reducers.js";
import {SET_ACTIVE_PROJECT} from "../actionTypes.js";
import {abilityUpdater} from "../../utils/can/ability.js";

const appReducer = combineReducers({
	projects,
	pages,
});

const rootReducer = (state, action) => {
	if (action.type === "USER_LOGOUT") {
		state = undefined;
	}
	if (action.type === SET_ACTIVE_PROJECT) {
		abilityUpdater(state.projects.list[action.payload]);
	}
	if (action.type === "persist/REHYDRATE") {
		abilityUpdater(action.payload.projects.list[action.payload.projects.activeProject]);
	}
	console.log(state, action);

	return appReducer(state, action);
};

export default rootReducer;

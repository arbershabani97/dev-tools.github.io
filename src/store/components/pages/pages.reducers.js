/* eslint-disable no-return-assign */
import {SET_PAGES} from "../../actionTypes";
import pages from "../../../static/pages";

const initialState = {};
pages.forEach(page => (initialState[page.title] = true));

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PAGES:
			return {
				...state,
				...action.payload,
				Settings: true,
			};

		default:
			return state;
	}
};

const formReducer = (state, action) => {
	switch (action.type) {
		case "TOGGLE":
			return {
				...state,
				[action.field]: !state[action.field],
			};

		case "UPDATE":
			return {
				...state,
				[action.field]: action.payload,
			};
		default:
			return state;
	}
};
export default formReducer;

import {createStore, applyMiddleware, compose} from "redux";

import reduxThunk from "redux-thunk";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./components";

const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
	const store = createStore(persistedReducer, compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));
	const persistor = persistStore(store);
	return {store, persistor};
};

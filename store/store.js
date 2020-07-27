import { createStore } from "redux";

import rootReducer from "./rootReducer";

const initialState = {};
// const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const store = createStore(rootReducer, initialState);

export default store;

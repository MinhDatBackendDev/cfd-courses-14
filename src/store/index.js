import { applyMiddleware, combineReducers, createStore } from "redux";
import countReducer from "./reducers/countReducer";
import dogReducer from "./reducers/dogReducer";

const reducers = combineReducers({
  counter: countReducer,
  dog: dogReducer,
});

const thunkMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    action(store.dispatch);
    return;
  }
  next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
export default store;

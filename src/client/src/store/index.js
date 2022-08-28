import { configureStore, combineReducers } from "@reduxjs/toolkit";
import formReducer from "./Form.js";
import tableReducer from "./Table.js";

const rootReducer = combineReducers({
  form: formReducer,
  table: tableReducer,
});

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

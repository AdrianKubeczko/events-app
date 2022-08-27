import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./Form.js";
import tableReducer from "./Table.js";

export default configureStore({
  reducer: {
    form: formReducer,
    table: tableReducer,
  },
});

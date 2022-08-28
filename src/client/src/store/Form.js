import * as R from "ramda";
import { createSlice } from "@reduxjs/toolkit";

export const Form = createSlice({
  name: "form",
  initialState: { inputValues: {}, formErrors: {} },
  reducers: {
    setInput: (state, action) => {
      const inputValue = R.pipe(R.values, R.head)(action.payload);
      const inputId = R.pipe(R.keys, R.head)(action.payload);
      if (!inputValue) {
        state.inputValues = { ...R.omit([inputId], state.inputValues) };
      } else {
        state.inputValues = { ...state.inputValues, ...action.payload };
        state.formErrors = { ...R.omit([inputId], state.formErrors) };
      }
    },
    setFormError: (state, action) => {
      state.formErrors = { ...state.formErrors, ...action.payload };
    },
    clearForm: (state) => {
      state.inputValues = {};
      state.formErrors = {};
    },
  },
});

export const { setInput, clearForm, setFormError } = Form.actions;

export default Form.reducer;

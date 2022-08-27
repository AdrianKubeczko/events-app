import values from "ramda/src/values";
import keys from "ramda/src/keys";
import pipe from "ramda/src/pipe";
import head from "ramda/src/head";
import omit from "ramda/src/omit";
import { createSlice } from "@reduxjs/toolkit";

export const Form = createSlice({
  name: "form",
  initialState: { inputValues: {}, formErrors: {} },
  reducers: {
    setInput: (state, action) => {
      const inputValue = pipe(values, head)(action.payload);
      const inputId = pipe(keys, head)(action.payload);
      if (!inputValue) {
        state.inputValues = { ...omit([inputId], state.inputValues) };
      } else {
        state.inputValues = { ...state.inputValues, ...action.payload };
        state.formErrors = { ...omit([inputId], state.formErrors) };
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

import * as R from "ramda";
import moduleDescriptions from "../descriptions/modules/index.js";
import { setFormError } from "../store/Form.js";

const keywordActionMap = {
  required: (error, fieldDescriptions, dispatch) => {
    const fieldId = R.path(["params", "missingProperty"], error);
    const fieldLabel = R.pipe(
      R.find((field) => R.equals(field.id, fieldId)),
      R.prop("label")
    )(fieldDescriptions);
    dispatch(setFormError({ [fieldId]: `${fieldLabel} is required` }));
  },
  pattern: (error, fieldDescriptions, dispatch) => {
    const fieldId = R.pipe(
      R.prop("schemaPath"),
      R.split("/"),
      R.prop([2])
    )(error);
    const fieldError = R.pipe(
      R.find((field) => R.equals(field.id, fieldId)),
      R.path(["errorMessages", "pattern"])
    )(fieldDescriptions);
    dispatch(setFormError({ [fieldId]: fieldError }));
  },
};

export default (errors, moduleId, dispatch) => {
  const fieldDescriptions = R.path([moduleId, "fields"], moduleDescriptions);
  errors.map((error) => {
    const { keyword } = error;
    if (keywordActionMap[keyword]) {
      keywordActionMap[keyword](error, fieldDescriptions, dispatch);
    }
  });
};

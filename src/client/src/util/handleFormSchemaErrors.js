import path from "ramda/src/path";
import find from "ramda/src/find";
import equals from "ramda/src/equals";
import pipe from "ramda/src/pipe";
import prop from "ramda/src/prop";
import split from "ramda/src/split";
import moduleDescriptions from "../descriptions/modules/index.js";
import { setFormError } from "../store/Form.js";

const keywordActionMap = {
  required: (error, fieldDescriptions, dispatch) => {
    const fieldId = path(["params", "missingProperty"], error);
    const fieldLabel = pipe(
      find((field) => equals(field.id, fieldId)),
      prop("label")
    )(fieldDescriptions);
    dispatch(setFormError({ [fieldId]: `${fieldLabel} is required` }));
  },
  pattern: (error, fieldDescriptions, dispatch) => {
    const fieldId = pipe(prop("schemaPath"), split("/"), prop([2]))(error);
    const fieldError = pipe(
      find((field) => equals(field.id, fieldId)),
      path(["errorMessages", "pattern"])
    )(fieldDescriptions);
    dispatch(setFormError({ [fieldId]: fieldError }));
  },
};

export default (errors, moduleId, dispatch) => {
  const fieldDescriptions = path([moduleId, "fields"], moduleDescriptions);
  errors.map((error) => {
    const { keyword } = error;
    if (keywordActionMap[keyword]) {
      keywordActionMap[keyword](error, fieldDescriptions, dispatch);
    }
  });
};

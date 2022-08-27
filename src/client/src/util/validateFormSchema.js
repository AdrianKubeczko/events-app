import Ajv from "ajv";
import handleFormSchemaErrors from "./handleFormSchemaErrors.js";

const ajv = new Ajv({ allErrors: true });

export default (formSchema, data, dispatch) => {
  const { moduleId, schema } = formSchema;
  const valid = ajv.validate(schema, data);
  if (ajv.errors) {
    handleFormSchemaErrors(ajv.errors, moduleId, dispatch);
  }
  return valid;
};

import Ajv from "ajv";
import { PayloadSchemaError, ResponseSchemaError } from "../utils/errors.js";

const ajv = new Ajv({ allErrors: true });

export default (schema, data, type) => {
  const valid = ajv.validate(schema, data);
  if (ajv.errors && type) {
    switch (type) {
      case "res":
        throw new ResponseSchemaError({ details: ajv.errors });
      case "req":
        throw new PayloadSchemaError({ details: ajv.errors });
      default:
        return valid;
    }
  }
  return valid;
};

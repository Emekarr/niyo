import { ValidationResult } from "joi";
import schemas from "./schemas";
import {
  DataValidationResult,
  ValidatorInterface,
  ValidatorSchemas,
} from "../../entities/interfaces/Validator";

export default class JoiValidator implements ValidatorInterface {
  validate<T>(payload: any, schema: ValidatorSchemas): DataValidationResult<T> {
    const result = schemas[schema].validate(payload) as ValidationResult<T>;
    return {
      err: result.error,
      value: result.value,
    };
  }
}

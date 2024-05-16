export interface ValidatorInterface {
  validate<T>(payload: T, schema: ValidatorSchemas): DataValidationResult<T>;
}

export interface DataValidationResult<T> {
  err: any;
  value: T;
}

export enum ValidatorSchemas {
  create_user = "create_user",
}

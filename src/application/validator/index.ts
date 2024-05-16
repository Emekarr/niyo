import { container, inject, injectable, singleton } from "tsyringe";
import { ValidatorInterface } from "../../entities/interfaces/Validator";
import JoiValidator from "../../infrastructure/validator/joi";

@injectable()
@singleton()
export class Validator {
  constructor(
    @inject("ValidatorInterface") public instance: ValidatorInterface
  ) {}
}

export default container.resolve(Validator);

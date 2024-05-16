import { container, inject, injectable, singleton } from "tsyringe";
import { JWTGeneratorInterface } from "../../infrastructure/cryptography/types";

@injectable()
@singleton()
class JWTGenerator {
  constructor(
    @inject("JWTGeneratorInterface") public instance: JWTGeneratorInterface
  ) {}
}

export default container.resolve(JWTGenerator);

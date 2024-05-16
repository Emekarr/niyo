import { container, inject, injectable, singleton } from "tsyringe";
import { HasherInterface } from "../../infrastructure/cryptography/types";

@injectable()
@singleton()
class Hasher {
  constructor(@inject("HasherInterface") public instance: HasherInterface) {}
}

export default container.resolve(Hasher);

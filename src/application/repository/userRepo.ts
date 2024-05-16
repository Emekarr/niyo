import { container, inject, injectable, singleton } from "tsyringe";
import User from "../../entities/domain/User";
import { Repository } from "../../infrastructure/repository/type";

@injectable()
@singleton()
class UserRepository {
  constructor(@inject("UserRepo") public instance: Repository<User>) {}
}

export default container.resolve(UserRepository);

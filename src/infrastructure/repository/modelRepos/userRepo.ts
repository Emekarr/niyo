import { UserModel, UserSchema } from "../models/User";
import { DefaultRepository } from "../index";

export default class UserRepo extends DefaultRepository<UserModel> {
  constructor() {
    super("User", UserSchema);
  }
}

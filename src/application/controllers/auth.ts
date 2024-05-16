import { Context } from "../../entities/interfaces/Context";
import CreateUser from "../usecases/CreateUser";
import { CreateUserDTO } from "./dto/auth";

export default abstract class AuthController {
  static async createUser(ctx: Context<CreateUserDTO>) {
    const result = await CreateUser.execute(
      ctx.body!,
      ctx.headers!["x-device-id"],
      ctx.headers!["user-agent"],
      ctx.headers!["x-app-version"]
    );
    ctx.respond(ctx.ctx, "user created", 201, result);
  }
}

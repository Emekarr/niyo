import { LoginUserDTO } from "../../controllers/dto/auth";
import hasher from "../../cryptography/hasher";
import jwtGenerator from "../../cryptography/jwtGenerator";
import BaseError from "../../errors/BaseError";
import eventEmitter from "../../eventEmitter";
import userRepo from "../../repository/userRepo";

export default abstract class LoginUser {
  static async execute(
    payload: LoginUserDTO,
    deviceID: string,
    userAgent: string,
    appVersion: string
  ) {
    const user = await userRepo.instance.findOne({
      email: payload.email,
    });
    if (!user)
      throw new BaseError("user with email does not exist", 404, false);
    const match = await hasher.instance.verify(
      payload.password,
      user.password!
    );
    if (!match) throw new BaseError("incorrect password");
    // in a production scenario a change detected in one of these values will lead to
    // the system requiring the user to provide an otp to verify the authenticity of the login attempt
    if (user.deviceID !== deviceID) {
    }
    if (user.appVersion !== appVersion) {
    }
    if (user.userAgent !== userAgent) {
    }
    const token = jwtGenerator.instance.generate({
      email: user.email,
      appVersion,
      userAgent,
      deviceID,
    });
    eventEmitter.instance.emitEvent("SOCKET_EVENT", {
      channel: "LOGIN_USER",
      data: user,
    });
    user.password = null;
    return { user, token };
  }
}

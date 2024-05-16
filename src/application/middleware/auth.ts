import Logger from "../loggers/Logger";
import { Context } from "../../entities/interfaces/Context";
import hasher from "../cryptography/hasher";
import BaseError from "../errors/BaseError";
import jwtGenerator from "../cryptography/jwtGenerator";
import userRepo from "../repository/userRepo";

export const AuthMiddleware = async (ctx: Context<any>) => {
  try {
    const tokenHeader = ctx.headers!["authorization"];
    if (!tokenHeader) throw new BaseError("authentication failed", 401);
    const token = tokenHeader.split(" ")[1];
    const payload = jwtGenerator.instance.verify(token);
    // makes sure user is still valid and up to date details are used
    const user = await userRepo.instance.findOne({
      email: payload.email,
    });
    if (!user) throw new BaseError("user does not exist", 404);
    if (user.appVersion !== payload.appVersion) {
      // this should trigger an account lock and force the user to
      // verify his identity before a token can be generated
      throw new BaseError("authentication failed", 401);
    }
    if (user.userAgent !== payload.userAgent) {
      // this should trigger an account lock and force the user to
      // verify his identity before a token can be generated
      throw new BaseError("authentication failed", 401);
    }
    if (user.deviceID !== payload.deviceID) {
      // this should trigger an account lock and force the user to
      // verify his identity before a token can be generated
      throw new BaseError("authentication failed", 401);
    }
    return {
      email: user.email,
      id: user.id,
    };
  } catch (err: any) {
    if (err.message.includes("jwt")) {
      ctx.errRespond(new BaseError("authentication failed", 401));
    }
    ctx.errRespond(err);
  }
};

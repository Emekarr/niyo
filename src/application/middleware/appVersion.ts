import config from "../../config";
import { Context } from "../../entities/interfaces/Context";
import BaseError from "../errors/BaseError";

export const AppVersionMiddleware = (ctx: Context<any>) => {
  const appVersion = Number(ctx.headers!["x-app-version"]);
  if (appVersion < config.getMinAppVersion())
    throw new BaseError(
      "You are using an outdated version of the app. Please update the app to proceed",
      401,
      false
    );
};

import { Context } from "../../entities/interfaces/Context";
import BaseError from "../errors/BaseError";

const requiredHeaders = ["user-agent", "x-app-version", "x-device-id"];

export const HeadersMiddleware = (ctx: Context<any>) => {
  requiredHeaders.forEach((header) => {
    if (!ctx.headers![header]) {
      throw new BaseError("missing headers", 400, false);
    }
  });
};

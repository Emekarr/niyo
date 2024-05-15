import Logger from "../loggers/Logger";
import { LoggerLevel } from "../loggers/types";
import { Context } from "../../entities/interfaces/Context";

export const ErrorMiddleware = (ctx: Context<any>) => {
  Logger.instance.write(
    LoggerLevel.error,
    "an error occured",
    {
      key: "error message",
      data: ctx.err.message,
    },
    {
      key: "error name",
      data: ctx.err.name,
    }
  );
  ctx.respond(ctx.ctx, "an error occured", ctx.err.statusCode ?? 500, null, [
    ctx.err.message,
  ]);
};

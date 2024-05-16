import { NextFunction, Request, Response } from "express";
import defaultResponder from "../../responder";
import { Context } from "../../../entities/interfaces/Context";
import { HeadersMiddleware } from "../../../application/middleware/headers";

export default (req: Request, res: Response, next: NextFunction) => {
  const ctx: Context<any> = {
    respond: defaultResponder.respond,
    errRespond: next,
    ctx: res,
    body: req.body,
    query: req.query as Record<string, string>,
    headers: req.headers as Record<string, string>,
  };
  HeadersMiddleware(ctx);
  req.ctx = ctx;
  next();
};

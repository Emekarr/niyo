import { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "../../../application/middleware/error";
import defaultResponder from "../../responder";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  ErrorMiddleware({
    err,
    respond: defaultResponder.respond,
    ctx: res,
    errRespond: next,
  });
};

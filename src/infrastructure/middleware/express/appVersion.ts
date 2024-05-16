import { NextFunction, Request, Response } from "express";
import defaultResponder from "../../responder";
import { Context } from "../../../entities/interfaces/Context";
import { AppVersionMiddleware } from "../../../application/middleware/appVersion";

export default (req: Request, res: Response, next: NextFunction) => {
  AppVersionMiddleware(req.ctx);
  next();
};

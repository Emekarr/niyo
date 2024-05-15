import { Response } from "express";

export class ExpressResponder {
  respond(
    ctx: Response,
    message: string,
    statusCode: number,
    payload: any,
    errors?: any[]
  ): void {
    ctx.status(statusCode).json({
      message,
      payload,
      errors,
    });
  }
}

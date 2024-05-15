import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;

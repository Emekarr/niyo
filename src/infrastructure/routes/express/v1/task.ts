import { NextFunction, Request, Response, Router } from "express";
import TaskController from "../../../../application/controllers/task";
import AuthMiddleware from "../../../middleware/express/auth";

const router = Router();

router.post(
  "/create",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TaskController.createTask(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;

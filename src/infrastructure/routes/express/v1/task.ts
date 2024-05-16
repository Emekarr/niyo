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

router.patch(
  "/update",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TaskController.updateTask(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

router.patch(
  "/delete",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TaskController.deleteTask(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/fetch",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TaskController.getTasks(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;

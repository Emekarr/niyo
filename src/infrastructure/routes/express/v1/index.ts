import { Router } from "express";
import authRoutes from "./auth";
import taskRoutes from "./task";

const router = Router();

router.use("/auth", authRoutes);
router.use("/task", taskRoutes);

export default router;

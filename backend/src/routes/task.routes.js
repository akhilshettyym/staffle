import express from "express";
import { createTaskController } from "../controllers/task.controllers.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { PERMISSIONS } from "../constants/permissions.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-task", authMiddleware, requirePermission(PERMISSIONS.CREATE_TASK), createTaskController);

export default router;
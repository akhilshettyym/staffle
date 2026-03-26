import express from "express";
import { PERMISSIONS } from "../constants/permissions.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { getTaskDetailsController } from "../controllers/TaskControllers/getTaskDetails.controller.js";

const router = express.Router();

/* GET /api/tasks/get-tasks-details */
router.get("/get-tasks-details", authMiddleware, requirePermission(PERMISSIONS.VIEW_TASKS), getTaskDetailsController);

export default router;
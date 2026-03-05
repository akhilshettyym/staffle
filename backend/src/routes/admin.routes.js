import express from "express";
import { PERMISSIONS } from "../constants/permissions.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { reviewTaskRejectionController, updateAdminController } from "../controllers/admin.controllers.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

/* PATCH /api/admin/update-admin/:adminId */
router.patch("/update-admin/:adminId", authMiddleware, requireAdmin, requirePermission(PERMISSIONS.UPDATE_ADMIN), updateAdminController);

/* PATCH /api/admin/review-task-rejection/:taskId */
router.patch("/review-task-rejection/:taskId", authMiddleware, requireAdmin, requirePermission(PERMISSIONS.REVIEW_REJECT_TASK), reviewTaskRejectionController);

export default router;
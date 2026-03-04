import express from "express";
import { PERMISSIONS } from "../constants/permissions.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { updateAdminController } from "../controllers/admin.controllers.js";

const router = express.Router();

/* PATCH /api/admin/update-admin/:adminId */
router.patch("/update-admin/:adminId", authMiddleware, requirePermission(PERMISSIONS.UPDATE_ADMIN), updateAdminController);

export default router;
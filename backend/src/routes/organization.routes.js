import express from "express";
import { approveOrganization, rejectOrganization } from "../controllers/organization.controller.js";
import { requireSuperAdmin } from "../middleware/role.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.patch("/approve/:orgId", authMiddleware, requireSuperAdmin, approveOrganization);

router.patch("/reject/:orgId", authMiddleware, requireSuperAdmin, rejectOrganization);

export default router;
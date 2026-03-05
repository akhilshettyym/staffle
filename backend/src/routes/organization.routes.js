import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { requireAdmin, requireSuperAdmin } from "../middleware/role.middleware.js";
import { approveOrganization, reactivateOrganization, rejectOrganization, revokeOrganization, updateOrganizationController } from "../controllers/organization.controller.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { PERMISSIONS } from "../constants/permissions.js";

const router = express.Router();

/* PATCH /api/org/approve-org/:orgId */
router.patch("/approve-org/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.APPROVE_ORGANIZATION), approveOrganization);

/* PATCH /api/org/reject-org/:orgId */
router.patch("/reject-org/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.REJECT_ORGANIZATION), rejectOrganization);

/* PATCH /api/org/revoke-org/:orgId */
router.patch("/revoke-org/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.REVOKE_ORGANIZATION), revokeOrganization);

/* PATCH /api/org/re-activate-org/:orgId */
router.patch("/re-activate-org/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.RE_ACTIVATE_ORGANIZATION), reactivateOrganization);

/* PATCH /api/org/update-organization/:orgId */
router.patch("/update-org/:orgId", authMiddleware, requireAdmin, requirePermission(PERMISSIONS.UPDATE_ORGANIZATION), updateOrganizationController);

export default router;
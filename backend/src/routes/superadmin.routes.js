import express from "express";
import { PERMISSIONS } from "../constants/permissions.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requireSuperAdmin } from "../middleware/role.middleware.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { getAllTasksDetails } from "../controllers/SuperAdminControllers/getAllTasks.controller.js";
import { getAllEmployeesDetails } from "../controllers/SuperAdminControllers/getAllEmployees.controller.js";
import { rejectOrganization } from "../controllers/SuperAdminControllers/rejectOrganization.controller.js";
import { revokeOrganization } from "../controllers/SuperAdminControllers/revokeOrganization.controller.js";
import { approveOrganization } from "../controllers/SuperAdminControllers/approveOrganization.controller.js";
import { getAllOrganizationDetails } from "../controllers/SuperAdminControllers/getAllOrganization.controller.js";
import { reactivateOrganization } from "../controllers/SuperAdminControllers/reactivateOrganization.controller.js";
import { deleteOrganizationController } from "../controllers/SuperAdminControllers/deleteOrganization.controller.js";
import { getSpecificOrganizationDetails } from "../controllers/SuperAdminControllers/getSpecificOrganization.controller.js";
import { getOrgSpecificEmployeeDetails } from "../controllers/SuperAdminControllers/getSpecificOrgEmployees.controller.js";
import { getOrgSpecificTasksDetails } from "../controllers/SuperAdminControllers/getSpecificOrgTasks.controller.js";

const router = express.Router();

/* GET /api/superadmin/get-all-organization-details */
router.get("/get-all-organizations-details", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.VIEW_ALL_ORGANIZATIONS), getAllOrganizationDetails);

/* GET /api/superadmin/get-all-employees-details */
router.get("/get-all-employees-details", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.VIEW_ALL_EMPLOYEES), getAllEmployeesDetails);

/* GET /api/superadmin/get-all-tasks-details */
router.get("/get-all-tasks-details", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.VIEW_ALL_EMPLOYEES), getAllTasksDetails);

/* PATCH /api/superadmin/approve-organization/:orgId */
router.patch("/approve-organization/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.APPROVE_ORGANIZATION), approveOrganization);

/* PATCH /api/superadmin/reject-organization/:orgId */
router.patch("/reject-organization/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.REJECT_ORGANIZATION), rejectOrganization);

/* PATCH /api/superadmin/revoke-organization/:orgId */
router.patch("/revoke-organization/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.REVOKE_ORGANIZATION), revokeOrganization);

/* PATCH /api/superadmin/re-activate-organization/:orgId */
router.patch("/re-activate-organization/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.RE_ACTIVATE_ORGANIZATION), reactivateOrganization);

/* DELETE /api/superadmin/delete-rejected-organization/:orgId */
router.delete("/delete-rejected-organization/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.DELETE_ORGANIZATION), deleteOrganizationController);


/* GET /api/superadmin/get-specific-organization-details/:orgId */
router.get("/get-specific-organization-details/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.VIEW_ALL_ORGANIZATIONS), getSpecificOrganizationDetails);

/* GET /api/superadmin/get-specific-employees-details/:orgId */
router.get("/get-org-specific-employees/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.VIEW_ALL_EMPLOYEES), getOrgSpecificEmployeeDetails);

/* GET /api/superadmin/get-specific-tasks-details/:orgId */
router.get("/get-org-specific-tasks/:orgId", authMiddleware, requireSuperAdmin, requirePermission(PERMISSIONS.VIEW_ALL_TASKS), getOrgSpecificTasksDetails);


export default router;
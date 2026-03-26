import express from "express";
import { PERMISSIONS } from "../constants/permissions.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { getAllOrganizationDetails } from "../controllers/SuperAdminControllers/getAllOrganization.controller.js";
import { getAllEmployeesDetails } from "../controllers/SuperAdminControllers/getAllEmployees.controller.js";
import { getAllTasksDetails } from "../controllers/SuperAdminControllers/getAllTasks.controller.js";

const router = express.Router();


/* GET /api/superadmin/get-all-organization-details */
router.get("/get-all-organizations-details", authMiddleware, requirePermission(PERMISSIONS.VIEW_ALL_ORGANIZATIONS), getAllOrganizationDetails);

/* GET /api/superadmin/get-all-employees-details */
router.get("/get-all-employees-details", authMiddleware, requirePermission(PERMISSIONS.VIEW_ALL_EMPLOYEES), getAllEmployeesDetails);

/* GET /api/superadmin/get-all-tasks-details */
router.get("/get-all-tasks-details", authMiddleware, requirePermission(PERMISSIONS.VIEW_ALL_EMPLOYEES), getAllTasksDetails);

export default router;
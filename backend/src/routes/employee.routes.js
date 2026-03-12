import express from "express";
import { PERMISSIONS } from "../constants/permissions.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { addEmployeeController, updateEmployeeController, deactivateEmployeeController, getOrganizationUsers, getOrganizationInactiveUsers } from "../controllers/employee.controllers.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

/* POST /api/employee/add-employee */
router.post("/add-employee", authMiddleware, requirePermission(PERMISSIONS.CREATE_EMPLOYEE), addEmployeeController);

/* PATCH /api/employee/update-employee/:employeeId */
router.patch("/update-employee/:employeeId", authMiddleware, requirePermission(PERMISSIONS.UPDATE_EMPLOYEE), updateEmployeeController);

/* PATCH /api/employee/deactivate-employee/:employeeId */
router.patch("/deactivate-employee/:employeeId", authMiddleware, requireAdmin, requirePermission(PERMISSIONS.DEACTIVATE_EMPLOYEE), deactivateEmployeeController);



/* GET /api/employee/get-employees */
router.get("/get-employees", authMiddleware, requirePermission(PERMISSIONS.VIEW_EMPLOYEES), getOrganizationUsers);

/* GET /api/employee/get-inactive-employees */
router.get("/get-inactive-employees", authMiddleware, requirePermission(PERMISSIONS.VIEW_EMPLOYEES), getOrganizationInactiveUsers);

export default router;
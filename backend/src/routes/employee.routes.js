import express from "express";
import { addEmployeeController } from "../controllers/employee.controllers.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { PERMISSIONS } from "../constants/permissions.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-employee", authMiddleware, requirePermission(PERMISSIONS.CREATE_EMPLOYEE), addEmployeeController);

export default router;
import express from "express";
import { createOrganizationController, userLoginController } from "../controllers/auth.controllers.js";

const router = express.Router();

/* POST /api/auth/create-organization */
router.post("/create-organization", createOrganizationController);

/* POST /api/auth/login */
router.post("/login", userLoginController)

export default router;
import express from "express";
import { userLoginController } from "../controllers/AuthControllers/userLogin.controller.js";
import { userLogoutController } from "../controllers/AuthControllers/userLogout.controller.js";
import { createOrganizationController } from "../controllers/AuthControllers/createOrganization.controller.js";

const router = express.Router();

/* POST /api/auth/create-organization */
router.post("/create-organization", createOrganizationController);

/* POST /api/auth/login */
router.post("/login", userLoginController);

/* POST /api/auth/logout */
router.post("/logout", userLogoutController);

export default router;
import express from "express";
import { createOrganizationController, userLoginController, userLogoutController } from "../controllers/auth.controllers.js";

const router = express.Router();

/* POST /api/auth/create-org */
router.post("/create-org", createOrganizationController);

/* POST /api/auth/login */
router.post("/login", userLoginController);

/* POST /api/auth/logout */
router.post("/logout", userLogoutController);

export default router;
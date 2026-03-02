import express from "express";
import { createOrganizationController } from "../controllers/auth.controllers.js";

const router = express.Router();

/* POST /api/auth/create-organization */
router.post("/create-organization", createOrganizationController);

export default router;
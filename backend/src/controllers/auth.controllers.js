import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import orgModel from "../models/org.model.js";

/**
 * CREATE ORGANIZATION + ADMIN USER
 * POST /api/auth/create-organization
 * Body: { firstName, lastName, email, password, confirmPassword, orgName, orgDomain, orgDescription, orgCountry? (optional)}
 */
async function createOrganizationController(req, res) {
    const session = await mongoose.startSession();

    try {
        // 1. input validation
        const { firstName, lastName, email, password, confirmPassword, orgName, orgDomain, orgDescription, orgCountry } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !orgName || !orgDomain || !orgDescription) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        // 2. Check if email or orgDomain already exists
        const existingUser = await userModel.findOne({ email }).lean();
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already in use",
            });
        }

        const existingOrg = await orgModel.findOne({ orgDomain }).lean();
        if (existingOrg) {
            return res.status(409).json({
                success: false,
                message: "Organization domain already taken",
            });
        }

        // 3. Start transaction
        session.startTransaction();

        // 3.1 Creation of Organization
        const [newOrg] = await orgModel.create(
            [{ orgName, orgDomain, orgDescription, orgCountry: orgCountry || null, status: "PENDING", createdBy: null }],
            { session }
        );

        // 3.2 Creation of Admin User
        const [newUser] = await userModel.create(
            [{ firstName, lastName, email, password, role: "ADMIN", organizationId: newOrg._id, permissions: ["org:admin", "task:*"] }],
            { session }
        );

        // 3.3 Back-reference: set createdBy on Organization
        newOrg.createdBy = newUser._id;
        await newOrg.save({ session });

        // 4. Commit transaction
        await session.commitTransaction();

        // 5. Generate JWT
        const token = jwt.sign(
            {
                userId: newUser._id,
                role: newUser.role,
                orgId: newUser.organizationId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        // 6. Safe response
        res.status(201).json({
            success: true,
            message: "Organization and admin account created successfully",
            organization: {
                _id: newOrg._id,
                uuid: newOrg.uuid,
                orgName: newOrg.orgName,
                orgDomain: newOrg.orgDomain,
                status: newOrg.status,
            },
            user: {
                _id: newUser._id,
                uuid: newUser.uuid,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
                fullName: newUser.fullName,
            },
            token,
        });

    } catch (error) {
        await session.abortTransaction();

        console.error("Organization creation failed:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email or organization domain already exists",
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error during organization creation",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });

    } finally {
        session.endSession();
    }
}

export { createOrganizationController };
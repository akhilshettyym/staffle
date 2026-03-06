import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import orgModel from "../models/org.model.js";
import { ROLE_PERMISSIONS } from "../constants/permissions.js";

async function createOrganizationController(req, res) {
    const session = await mongoose.startSession();

    try {
        const { firstName, lastName, email, password, confirmPassword, dateOfBirth, designation, orgName, orgDomain, orgDescription, orgCountry } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !dateOfBirth || !designation || !orgName || !orgDomain || !orgDescription) {
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

        const parsedDOB = new Date(dateOfBirth);
        if (isNaN(parsedDOB.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use YYYY-MM-DD",
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already in use",
            });
        }

        const existingOrg = await orgModel.findOne({ orgDomain });
        if (existingOrg) {
            return res.status(409).json({
                success: false,
                message: "Organization domain already taken",
            });
        }

        session.startTransaction();

        const [newOrg] = await orgModel.create(
            [
                {
                    orgName,
                    orgDomain,
                    orgDescription,
                    orgCountry: orgCountry || null,
                    status: "PENDING",
                    createdBy: null,
                },
            ],
            { session }
        );

        const [newUser] = await userModel.create(
            [
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    dateOfBirth: parsedDOB,
                    designation,
                    role: "ADMIN",
                    organizationId: newOrg._id,
                    permissions: ROLE_PERMISSIONS["ADMIN"] || [],
                },
            ],
            { session }
        );

        newOrg.createdBy = newUser._id;
        await newOrg.save({ session });

        await session.commitTransaction();

        const token = jwt.sign(
            {
                userId: newUser._id,
                role: newUser.role,
                orgId: newUser.organizationId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "Organization and admin account created successfully",
            organization: newOrg,
            user: newUser,
            token,
        });

    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({
            success: false,
            message: "Server error during organization creation",
            error:
                process.env.NODE_ENV === "development" ? error.message : undefined,
        });

    } finally {
        session.endSession();
    }
}

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const normalizedEmail = email.toLowerCase();
        const user = await userModel.findOne({ email: normalizedEmail }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email or password is invalid"
            });
        }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Email or password is invalid"
            });
        }

        if (user.employmentStatus === "IN-ACTIVE") {
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated. Contact system administrator."
            });
        }

        if (user.role !== "SUPER_ADMIN") {

            if (!user.organizationId) {
                return res.status(403).json({
                    success: false,
                    message: "User does not belong to any organization"
                });
            }

            const organization = await orgModel.findById(user.organizationId);

            if (!organization) {
                return res.status(403).json({
                    success: false,
                    message: "Organization not found"
                });
            }

            if (organization.status !== "ACTIVE") {
                return res.status(403).json({
                    success: false,
                    message: `Organization approval status is ${organization.status}. Login not allowed until approved.`
                });
            }
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                orgId: user.organizationId
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                uuid: user.uuid,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                fullName: user.fullName,
                organizationId: user.organizationId
            },
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error during login",
            error: error.message
        });
    }
}

async function userLogoutController(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error during logout",
            error: error.message,
        });
    }
}

export { createOrganizationController, userLoginController, userLogoutController };
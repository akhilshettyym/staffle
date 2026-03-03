import taskModel from "../models/task.model.js";
import userModel from "../models/user.model.js";
import organizationModel from "../models/org.model.js";
import crypto from "node:crypto";

export const createTaskController = async (req, res) => {
    try {
        const { title, category, description, assignedTo, dueDate, priority } = req.body;

        const loggedInUser = req.user;

        const organization = await organizationModel.findById(loggedInUser.organizationId);

        if (!organization || organization.status !== "ACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Organization is not active"
            });
        }

        const assignedUser = await userModel.findById(assignedTo);

        if (!assignedUser) {
            return res.status(404).json({
                success: false,
                message: "Assigned user not found"
            });
        }

        if (
            assignedUser.organizationId.toString() !==
            loggedInUser.organizationId.toString()
        ) {
            return res.status(400).json({
                success: false,
                message: "User does not belong to your organization"
            });
        }

        const task = await taskModel.create({
            uuid: crypto.randomUUID(),
            title,
            category,
            description,
            organizationId: loggedInUser.organizationId,
            assignedTo,
            dueDate,
            priority
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating task",
            error: error.message
        });
    }
};
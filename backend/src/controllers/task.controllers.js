import crypto from "node:crypto";
import taskModel from "../models/task.model.js";
import userModel from "../models/user.model.js";
import orgModel from "../models/org.model.js";

export const createTaskController = async (req, res) => {
    try {
        const { title, category, description, assignedTo, dueDate, priority } = req.body;

        const loggedInUser = req.user;

        const organization = await orgModel.findById(loggedInUser.organizationId);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        if (organization.status !== "ACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Organization is not active"
            });
        }

        const assignedUser = await userModel.findById(assignedTo);

        if (!assignedUser || assignedUser.employmentStatus === "IN-ACTIVE") {
            return res.status(404).json({
                success: false,
                message: "Assigned user not found"
            });
        }

        if (assignedUser.organizationId.toString() !== loggedInUser.organizationId.toString()) {
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
            message: "Error creating the task",
            error: error.message
        });
    }
};

export const updateTaskController = async (req, res) => {
    try {
        const { taskId } = req.params;
        const loggedInUser = req.user;

        const { title, category, description, assignedTo, dueDate, priority } = req.body;

        const task = await taskModel.findOne({
            _id: taskId,
            organizationId: loggedInUser.organizationId,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        if (task.organizationId.toString() !== loggedInUser.organizationId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot update tasks from another organization",
            });
        }

        if (task.status !== "NEW") {
            return res.status(400).json({
                success: false,
                message: "Only tasks with NEW status can be updated",
            });
        }

        if (assignedTo) {
            const assignedUser = await userModel.findById(assignedTo);

            if (!assignedUser) {
                return res.status(404).json({
                    success: false,
                    message: "Assigned user not found",
                });
            }

            if (assignedUser.organizationId.toString() !== loggedInUser.organizationId.toString()) {
                return res.status(400).json({
                    success: false,
                    message: "Assigned user does not belong to your organization",
                });
            }
            task.assignedTo = assignedTo;
        }


        if (title !== undefined) task.title = title;
        if (category !== undefined) task.category = category;
        if (description !== undefined) task.description = description;
        if (priority !== undefined) task.priority = priority;

        if (dueDate !== undefined) {
            const parsedDate = new Date(dueDate);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid due date format",
                });
            }
            task.dueDate = parsedDate;
        }

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating the task",
            error: error.message,
        });
    }
};

export const acceptTaskController = async (req, res) => {
    try {
        const { taskId } = req.params;
        const loggedInUser = req.user;

        const task = await taskModel.findOne({
            _id: taskId,
            organizationId: loggedInUser.organizationId,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        if (task.assignedTo.toString() !== loggedInUser._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to accept this task",
            });
        }

        if (task.status !== "NEW") {
            return res.status(400).json({
                success: false,
                message: "Only NEW tasks can be accepted",
            });
        }

        task.status = "IN_PROGRESS";

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task accepted and moved to IN_PROGRESS",
            task,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error accepting the task",
            error: error.message,
        });
    }
};

export const requestTaskRejectionController = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { reason } = req.body;
        const loggedInUser = req.user;

        if (!reason || reason.trim().length < 10) {
            return res.status(400).json({
                success: false,
                message: "Rejection reason is required (min 10 characters)"
            });
        }

        const task = await taskModel.findOne({
            _id: taskId,
            organizationId: loggedInUser.organizationId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        if (task.assignedTo.toString() !== loggedInUser._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        if (task.status !== "NEW") {
            return res.status(400).json({
                success: false,
                message: "Only NEW tasks can be rejected"
            });
        }

        task.status = "REJECTION_REQUESTED";

        task.rejection = {
            requestedBy: loggedInUser._id,
            reason,
            requestedAt: new Date(),
            status: "PENDING"
        };

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Rejection request submitted to admin",
            task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error requesting rejection",
            error: error.message
        });
    }
};

export const markAsCompletedController = async (req, res) => {
    try {
        const { taskId } = req.params;
        const loggedInUser = req.user;

        const task = await taskModel.findOne({
            _id: taskId,
            organizationId: loggedInUser.organizationId,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        if (task.assignedTo.toString() !== loggedInUser._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to accept this task",
            });
        }

        if (task.status !== "IN_PROGRESS") {
            return res.status(403).json({
                success: false,
                message: "Only tasks IN_PROGRESS can be marked as COMPLETED",
            });
        }

        task.status = "COMPLETED";

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task moved to COMPLETED",
            task,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error marking the task as completed",
            error: error.message,
        });
    }
};

export const markTaskAsFailedController = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { reason } = req.body;
        const loggedInUser = req.user;

        if (!reason || reason.trim().length < 10) {
            return res.status(400).json({
                success: false,
                message: "Failure reason is required (min 10 characters)"
            });
        }

        const task = await taskModel.findOne({
            _id: taskId,
            organizationId: loggedInUser.organizationId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        if (task.assignedTo.toString() !== loggedInUser._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to mark this task as failed"
            });
        }

        if (task.status !== "IN_PROGRESS") {
            return res.status(400).json({
                success: false,
                message: "Only IN_PROGRESS tasks can be marked as FAILED"
            });
        }

        task.status = "FAILED";

        task.taskLifeCycle.failure = {
            reason,
            failedBy: loggedInUser._id,
        };

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task marked as FAILED",
            task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error marking task as failed",
            error: error.message
        });
    }
};

export const deleteTaskController = async (req, res) => {
    try {
        const { taskId } = req.params;
        const loggedInUser = req.user;

        const deletedTask = await taskModel.findOneAndDelete({
            _id: taskId,
            organizationId: loggedInUser.organizationId,
        });

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found or you are not authorized to delete it",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            deletedTask,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting the task",
            error: error.message,
        });
    }
};
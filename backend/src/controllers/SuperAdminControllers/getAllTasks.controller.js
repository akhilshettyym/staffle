import taskModel from "../../models/task.model.js";

export const getAllTasksDetails = async (req, res) => {

    try {

        const tasks = await taskModel
            .find({})
            .select("title category priority assignedTo description organizationId dueDate status createdAt rejection taskLifeCycle");

        return res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {

        console.error("Get tasks details error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks details"
        });
    }
};
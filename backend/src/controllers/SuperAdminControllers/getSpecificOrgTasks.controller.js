import taskModel from "../../models/task.model.js";

export const getOrgSpecificTasksDetails = async (req, res) => {
    try {

        const { orgId } = req.params;

        const tasks = await taskModel
            .find({ organizationId: orgId })
            .select(
                "uuid title category description assignedTo dueDate priority status organizationId createdAt"
            )
            .populate("assignedTo", "firstName lastName email");

        return res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {

        console.error("Get org tasks error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch organization tasks"
        });
    }
};
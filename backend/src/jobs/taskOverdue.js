import cron from "node-cron";
import taskModel from "../models/task.model.js";

const startOverdueTaskJob = () => {
    cron.schedule("0 * * * *", async () => {

        try {
            const now = new Date();
            const result = await taskModel.updateMany(

                {
                    dueDate: { $lt: now },
                    status: { $in: ["NEW", "IN_PROGRESS"] }
                },

                {
                    $set: {
                        status: "FAILED",
                        "taskLifeCycle.failure.reason": "Task automatically failed because due date expired",
                        "taskLifeCycle.failure.failedAt": new Date()
                    }
                }
            );

            if (result.modifiedCount > 0) {
                console.log(`${result.modifiedCount} tasks auto-marked as FAILED`);
            }

        } catch (error) {
            console.error("Cron job failed:", error.message);
        }

    });
};

export default startOverdueTaskJob;
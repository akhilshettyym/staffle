import userModel from "../../models/user.model.js";

export const reactivateEmployeeController = async (req, res) => {

    try {
        const { empId } = req.params;
        const loggedInUser = req.user;

        if (!empId) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        if (!["ADMIN", "SUPER_ADMIN"].includes(loggedInUser.role)) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        let employee;

        if (loggedInUser.role === "SUPER_ADMIN") {
            employee = await userModel.findById(empId);
        } else {
            employee = await userModel.findOne({
                _id: empId,
                organizationId: loggedInUser.organizationId
            });
        }

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found or not authorized"
            });
        }

        if (
            employee.role === "ADMIN" &&
            loggedInUser.role !== "SUPER_ADMIN"
        ) {
            return res.status(400).json({
                success: false,
                message: "Cannot reactivate organization admin"
            });
        }

        if (employee.employmentStatus === "ACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Employee is already active"
            });
        }

        employee.employmentStatus = "ACTIVE";
        employee.employmentStatusChangedAt = new Date();

        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Employee reactivated successfully",
            employee
        });

    } catch (error) {
        console.error("Reactivate employee error:", error);

        return res.status(500).json({
            success: false,
            message: "Error reactivating employee"
        });
    }
};
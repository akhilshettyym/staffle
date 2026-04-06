import userModel from "../../models/user.model.js";

export const updateEmployeeController = async (req, res) => {

    try {
        const { employeeId } = req.params;
        const loggedInUser = req.user;

        const { firstName, lastName, email, dateOfBirth, designation } = req.body;
        
        const query =
            loggedInUser.role === "SUPER_ADMIN"
                ? { _id: employeeId }
                : { _id: employeeId, organizationId: loggedInUser.organizationId };

        const employee = await userModel.findOne(query);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        if (employee.role !== "EMPLOYEE") {
            return res.status(403).json({
                success: false,
                message: "Only employees can be updated",
            });
        }

        if (employee.employmentStatus !== "ACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Only active employee details can be updated",
            });
        }

        if (
            firstName === undefined &&
            lastName === undefined &&
            email === undefined &&
            designation === undefined &&
            dateOfBirth === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "No fields provided for update",
            });
        }

        // email check
        if (email && email !== employee.email) {
            const existingEmail = await userModel.findOne({ email });

            if (existingEmail) {
                return res.status(409).json({
                    success: false,
                    message: "Email already in use",
                });
            }

            employee.email = email;
        }

        if (firstName !== undefined) employee.firstName = firstName;
        if (lastName !== undefined) employee.lastName = lastName;
        if (designation !== undefined) employee.designation = designation;

        if (dateOfBirth !== undefined) {
            const parsedDate = new Date(dateOfBirth);

            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid DOB format",
                });
            }

            employee.dateOfBirth = parsedDate;
        }

        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Employee details updated successfully",
            employee,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating employee details",
            error: error.message,
        });
    }
};
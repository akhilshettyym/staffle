import userModel from "../models/user.model.js";
import orgModel from "../models/org.model.js";
import { ROLE_PERMISSIONS } from "../constants/permissions.js";

export const addEmployeeController = async (req, res) => {
    try {
        const { firstName, lastName, email, password, dateOfBirth, designation } = req.body;

        if (!firstName || !lastName || !email || !password || !dateOfBirth || !designation) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
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
                message: "Email already exists",
            });
        }

        if (!req.user?.organizationId) {
            return res.status(400).json({
                success: false,
                message: "Admin does not belong to an organization",
            });
        }

        const organization = await orgModel.findById(req.user.organizationId);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        if (organization.status === "PENDING") {

            const employeeCount = await userModel.countDocuments({
                organizationId: organization._id,
                role: "EMPLOYEE",
            });

            if (employeeCount >= 3) {
                return res.status(403).json({
                    success: false,
                    message: "Organization approval status is pending. You can only add up to 3 employees until approval.",
                });
            }
        }

        const newEmployee = await userModel.create({
            firstName,
            lastName,
            email,
            password,
            dateOfBirth: parsedDOB,
            designation,
            role: "EMPLOYEE",
            organizationId: req.user.organizationId,
            permissions: ROLE_PERMISSIONS["EMPLOYEE"] || [],
        });

        return res.status(201).json({
            success: true,
            message: "Employee added successfully",
            employee: newEmployee,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while adding employee",
            error: error.message,
        });
    }
};

export const updateEmployeeController = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const loggedInUser = req.user;

        if (loggedInUser.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Only admins can update employee details",
            });
        }

        const { firstName, lastName, email, dateOfBirth, designation } = req.body;

        const employee = await userModel.findOne({
            _id: employeeId,
            organizationId: loggedInUser.organizationId,
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        if (employee.employmentStatus !== "ACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Only active employee details can be updated",
            });
        }

        if (firstName === undefined && lastName === undefined && email === undefined && designation === undefined && dateOfBirth === undefined) {
            return res.status(400).json({
                success: false,
                message: "No fields provided for update",
            });
        }

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

export const getOrganizationUsers = async (req, res) => {
    try {
        const organizationId = req.user.organizationId;
        const users = await userModel.find({ organizationId, employmentStatus: "ACTIVE" })
            .select("firstName lastName email dateOfBirth designation role employmentStatus")
            .sort({ createdAt: 1 });
        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch organization users"
        });
    }
};

export const getOrganizationInactiveUsers = async (req, res) => {
    try {
        const organizationId = req.user.organizationId;
        const users = await userModel.find({ organizationId, employmentStatus: "IN-ACTIVE" })
            .select("firstName lastName email dateOfBirth designation role employmentStatus")
            .sort({ createdAt: 1 });
        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch organization users"
        });
    }
};

export const deactivateEmployeeController = async (req, res) => {
    try {
        const { empId } = req.params;
        const loggedInUser = req.user;

        const employee = await userModel.findOne({
            _id: empId,
            organizationId: loggedInUser.organizationId,
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found or not authorized",
            });
        }

        if (employee.role === "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "Cannot remove organization admin",
            });
        }

        if (employee.employmentStatus === "IN-ACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Employee already removed",
            });
        }

        employee.employmentStatus = "IN-ACTIVE";
        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Employee removed successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error removing employee",
            error: error.message,
        });
    }
};

export const reactivateEmployeeController = async (req, res) => {
    try {
        const { empId } = req.params;
        const { organizationId } = req.user;

        if (!empId) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const employee = await userModel.findOne({
            _id: empId,
            organizationId
        });

        if (!employee)
            return res.status(404).json({
                success: false,
                message: "Employee not found or not authorized"
            });

        if (employee.role === "ADMIN")
            return res.status(400).json({
                success: false,
                message: "Cannot reactivate organization admin"
            });

        if (employee.employmentStatus === "ACTIVE")
            return res.status(400).json({
                success: false,
                message: "Employee is already active"
            });

        employee.employmentStatus = "ACTIVE";
        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Employee reactivated successfully"
        });

    } catch (error) {
        console.error("Reactivate employee error:", error);

        return res.status(500).json({
            success: false,
            message: "Error reactivating employee"
        });
    }
};
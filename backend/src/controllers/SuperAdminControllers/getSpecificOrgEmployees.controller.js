import userModel from "../../models/user.model.js";

export const getOrgSpecificEmployeeDetails = async (req, res) => {
    try {

        const { orgId } = req.params;

        const employees = await userModel
            .find({
                organizationId: orgId,
                role: { $ne: "SUPER_ADMIN" }
            })
            .select("uuid firstName lastName email role designation employmentStatus organizationId createdAt");

        return res.status(200).json({
            success: true,
            employees
        });

    } catch (error) {

        console.error("Get org employees error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch organization employees"
        });
    }
};
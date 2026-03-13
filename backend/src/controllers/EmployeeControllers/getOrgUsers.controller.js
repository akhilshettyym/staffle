import userModel from "../../models/user.model.js";

export const getOrganizationUsers = async (req, res) => {

    try {
        const organizationId = req.user.organizationId;
        const users = await userModel.find({ organizationId, employmentStatus: "ACTIVE" })
            .select("firstName lastName email dateOfBirth designation role employmentStatus organizationId")
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
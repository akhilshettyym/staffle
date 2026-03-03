import organizationModel from "../models/org.model.js";

export const approveOrganization = async (req, res) => {
    try {
        const { orgId } = req.params;

        const organization = await organizationModel.findById(orgId);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        if (organization.status !== "PENDING") {
            return res.status(400).json({
                success: false,
                message: "Organization is not in pending state",
            });
        }

        organization.status = "ACTIVE";
        await organization.save();

        return res.status(200).json({
            success: true,
            message: "Organization approved successfully",
            organization,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error approving organization",
            error: error.message,
        });
    }
};

export const rejectOrganization = async (req, res) => {
    try {
        const { orgId } = req.params;

        const organization = await organizationModel.findById(orgId);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        if (organization.status !== "PENDING") {
            return res.status(400).json({
                success: false,
                message: "Organization is not in pending state",
            });
        }

        organization.status = "REJECTED";
        await organization.save();

        return res.status(200).json({
            success: true,
            message: "Organization rejected successfully",
            organization,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error rejecting organization",
            error: error.message,
        });
    }
};
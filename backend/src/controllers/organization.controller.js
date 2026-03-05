import orgModel from "../models/org.model.js";

export const approveOrganization = async (req, res) => {
    try {
        const { orgId } = req.params;

        const organization = await orgModel.findById(orgId);

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

        const organization = await orgModel.findById(orgId);

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

export const revokeOrganization = async (req, res) => {
    try {
        const { orgId } = req.params;

        const organization = await orgModel.findById(orgId);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        if (organization.status !== "ACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Organization is not in active state",
            });
        }

        organization.status = "REVOKED";
        await organization.save();

        return res.status(200).json({
            success: true,
            message: "Organization revoked successfully",
            organization,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error revoking organization",
            error: error.message,
        });
    }
}

export const reactivateOrganization = async (req, res) => {
    try {
        const { orgId } = req.params;

        const organization = await orgModel.findById(orgId);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        if (organization.status !== "REVOKED") {
            return res.status(400).json({
                success: false,
                message: "Organization is not in REVOKED state",
            });
        }

        organization.status = "ACTIVE";
        await organization.save();

        return res.status(200).json({
            success: true,
            message: "Organization re-activated successfully",
            organization
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error re-activating organization"
        });
    }
}

export const updateOrganizationController = async (req, res) => {
    try {
        const loggedInUser = req.user;

        if (loggedInUser.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Only admins can update organization details",
            });
        }

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
                message: "Only active organizations can be updated",
            });
        }

        const { orgName, orgDomain, orgCountry, orgDescription } = req.body;

        if (orgName === undefined && orgDomain === undefined && orgCountry === undefined && orgDescription === undefined) {
            return res.status(400).json({
                success: false,
                message: "No fields provided for update",
            });
        }

        if (orgDomain && orgDomain !== organization.orgDomain) {
            const existingDomain = await orgModel.findOne({ orgDomain });
            if (existingDomain) {
                return res.status(409).json({
                    success: false,
                    message: "Organization domain already exists",
                });
            }
            organization.orgDomain = orgDomain;
        }

        if (orgName !== undefined) organization.orgName = orgName;
        if (orgCountry !== undefined) organization.orgCountry = orgCountry;
        if (orgDescription !== undefined) organization.orgDescription = orgDescription;

        await organization.save();

        return res.status(200).json({
            success: true,
            message: "Organization updated successfully",
            organization,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating organization",
            error: error.message,
        });
    }
};
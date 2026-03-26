import orgModel from "../../models/org.model.js";

export const deleteOrganizationController = async (req, res) => {
    try {
        const { orgId } = req.params;

        const organization = await orgModel.findOne({
            _id: orgId,
        });

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        if (organization.status !== "REJECTED") {
            return res.status(403).json({
                success: false,
                message: "Only rejected organizations can be deleted",
            });
        }

        const deletedOrganization = await orgModel.findByIdAndDelete(orgId);

        return res.status(200).json({
            success: true,
            message: "Organization deleted successfully",
            deletedOrganization,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting organization",
            error: error.message,
        });
    }
};
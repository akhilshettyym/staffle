import orgModel from "../../models/org.model.js";

export const getSpecificOrganizationDetails = async (req, res) => {
    try {

        const { orgId } = req.params;

        const organization = await orgModel
            .findById(orgId)
            .select("uuid orgName orgDomain orgDescription orgCountry status createdBy createdAt");

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found"
            });
        }

        return res.status(200).json({
            success: true,
            organization
        });

    } catch (error) {

        console.error("Get specific organization error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch organization details"
        });
    }
};
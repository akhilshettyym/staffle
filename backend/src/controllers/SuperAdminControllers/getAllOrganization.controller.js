import orgModel from "../../models/org.model.js";

export const getAllOrganizationDetails = async (req, res) => {

    try {
        const organizations = await orgModel
            .find({})
            .select("uuid orgName orgDomain orgCountry status createdBy createdAt");

        if (!organizations) {
            return res.status(404).json({
                success: false,
                message: "No Organization found"
            });
        }

        return res.status(200).json({
            success: true,
            organizations
        });

    } catch (error) {

        console.error("Get organization details error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch organization details"
        });
    }
};
import { useCallback, useState } from "react";
import { getSpecificOrganizationDetails } from "../../api/superadmin";
import toast from "react-hot-toast";

const useSuperAdminGetOrgSpecificOrganizationDetails = ({ orgId }) => {

    const [specificOrganization, setSpecificOrganization] = useState(null);

    const fetchSpecificOrganization = useCallback(async () => {

        if (!orgId) return;

        try {
            const orgResponse = await getSpecificOrganizationDetails(orgId);
            setSpecificOrganization(orgResponse?.organization || null);

        } catch (error) {
            console.error("Failed to fetch Organization details", error);
            toast.error("Could not fetch organization");
        }
    }, [orgId]);

    return { specificOrganization, setSpecificOrganization, fetchSpecificOrganization };
};

export default useSuperAdminGetOrgSpecificOrganizationDetails;
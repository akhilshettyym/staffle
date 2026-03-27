import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { getOrganizationSpecificEmployeeDetails } from "../../api/superadmin";

const useSuperAdminGetOrgSpecificEmployeeDetails = ({ orgId }) => {

    const [orgSpecificEmployees, setOrgSpecificEmployees] = useState(null);

    const fetchOrgSpecificEmployees = useCallback(async () => {

        if (!orgId) return;

        try {
            const orgResponse = await getOrganizationSpecificEmployeeDetails(orgId);
            setOrgSpecificEmployees(orgResponse?.employees || null);

        } catch (error) {
            console.error("Failed to fetch employee details", error);
            toast.error("Could not fetch employees");
        }
    }, [orgId]);

    return { orgSpecificEmployees, setOrgSpecificEmployees, fetchOrgSpecificEmployees };
};

export default useSuperAdminGetOrgSpecificEmployeeDetails;
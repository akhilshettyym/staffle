import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { getOrganizationSpecificTasksDetails } from "../../api/superadmin";

const useSuperAdminGetOrgSpecificTasksDetails = ({ orgId }) => {

    const [orgSpecificTasks, setOrgSpecificTasks] = useState(null);

    const fetchOrgSpecificTasks = useCallback(async () => {

        if (!orgId) return;

        try {
            const orgResponse = await getOrganizationSpecificTasksDetails(orgId);
            setOrgSpecificTasks(orgResponse?.tasks || null);

        } catch (error) {
            console.error("Failed to fetch tasks details", error);
            toast.error("Could not fetch tasks");
        }
    }, [orgId]);

    return { orgSpecificTasks, setOrgSpecificTasks, fetchOrgSpecificTasks };
};

export default useSuperAdminGetOrgSpecificTasksDetails;
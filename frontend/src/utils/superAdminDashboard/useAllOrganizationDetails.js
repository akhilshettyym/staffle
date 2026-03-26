import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getAllOrganizationDetails } from "../../api/superadmin";

const useAllOrganizationDetails = () => {

    const [allOrganization, setAllOrganization] = useState([]);

    const fetchAllOrganization = useCallback(async () => {

        try {
            const response = await getAllOrganizationDetails();
            setAllOrganization(response?.organizations || []);

        } catch (error) {
            console.error("Failed to fetch Organization details", error);
            toast.error("Could not fetch organizations");
        }
    }, []);

    return { allOrganization, setAllOrganization, fetchAllOrganization };
};

export default useAllOrganizationDetails;
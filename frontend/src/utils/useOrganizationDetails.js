import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getOrganizationDetails } from "../api/organization";

const useOrganizationDetails = () => {

    const [organization, setOrganization] = useState([]);

    const fetchOrganization = useCallback(async () => {

        try {
            const orgResponse = await getOrganizationDetails();
            setOrganization(orgResponse?.organization || []);
        } catch (error) {
            console.error("Failed to fetch Organization details", error);
            toast.error("Could not fetch organization");
        }
    }, []);

    return { organization, setOrganization, fetchOrganization };
};

export default useOrganizationDetails;
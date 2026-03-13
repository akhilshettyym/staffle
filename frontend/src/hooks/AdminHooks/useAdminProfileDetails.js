import { useMemo, useState } from "react";
import { getOrganizationUsers } from "../../api/employee";
import toast from "react-hot-toast";
import { getOrganizationDetails } from "../../api/organization";

const useAdminProfileDetails = () => {

    const [employees, setEmployees] = useState([]);
    const [organization, setOrganization] = useState({});
    const [activeTab, setActiveTab] = useState("organization");

    const admin = useMemo(
        () => employees.find((emp) => emp.role === "ADMIN"),
        [employees]
    );

    const formattedDOB = admin?.dateOfBirth ? new Date(admin.dateOfBirth).toLocaleDateString() : "";

    const orgCountry = {
        IN: "India",
        US: "United States",
        UK: "United Kingdom",
        CA: "Canada"
    }[organization?.orgCountry];

    const fetchEmployees = async () => {
        try {
            const response = await getOrganizationUsers();
            setEmployees(response?.users || []);
        } catch (error) {
            console.error("Failed to fetch employees", error);
            toast.error("Could not fetch employees");
        }
    };

    const fetchOrganization = async () => {
        try {
            const orgResponse = await getOrganizationDetails();
            setOrganization(orgResponse?.organization || {});
        } catch (error) {
            console.error("Failed to fetch Organization details", error);
            toast.error("Could not fetch organization");
        }
    };

    return { organization, admin, activeTab, setActiveTab, formattedDOB, orgCountry, fetchEmployees, fetchOrganization };
}

export default useAdminProfileDetails;
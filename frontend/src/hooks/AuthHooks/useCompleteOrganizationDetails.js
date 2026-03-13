import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrganizationUsers } from "../../api/employee";
import toast from "react-hot-toast";
import { getOrganizationDetails } from "../../api/organization";
import { useMemo } from "react";

const useCompleteOrganizationDetails = () => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [organization, setOrganization] = useState([]);

    const admin = useMemo(() => employees.find((emp) => emp.role === "ADMIN"), [employees]);

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
            setOrganization(orgResponse?.organization);
        } catch (error) {
            console.error("Failed to fetch Organization details", error);
            toast.error("Could not fetch organization");
        }
    };

    const formattedDOB = admin?.dateOfBirth ? new Date(admin.dateOfBirth).toLocaleDateString() : "";

    const orgCountry = {
        IN: "India",
        US: "United States",
        UK: "United Kingdom",
        CA: "Canada"
    }[organization?.orgCountry];

    const handleRegisterOrg = () => {
        toast.success("Organization Registered Successfully...");
        navigate("/register-organization");
    }

    return { admin, employees, orgCountry, organization, formattedDOB, fetchEmployees, fetchOrganization, handleRegisterOrg };
};

export default useCompleteOrganizationDetails;
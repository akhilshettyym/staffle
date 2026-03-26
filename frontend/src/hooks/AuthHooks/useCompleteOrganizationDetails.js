import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMemo } from "react";
import useEmployeesDetails from "../../utils/useEmployeesDetails";
import useOrganizationDetails from "../../utils/useOrganizationDetails";

const useCompleteOrganizationDetails = () => {

    const navigate = useNavigate();

    const { employees, fetchEmployees } = useEmployeesDetails();
    const { organization, fetchOrganization } = useOrganizationDetails();

    const admin = useMemo(() => employees.find((emp) => emp.role === "ADMIN"), [employees]);

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

    const refreshEmployeesData = async () => {
        await Promise.all([
            fetchEmployees(),
        ]);
    };

    return { admin, employees, orgCountry, organization, formattedDOB, fetchEmployees, refreshEmployeesData, fetchOrganization, handleRegisterOrg };
};

export default useCompleteOrganizationDetails;
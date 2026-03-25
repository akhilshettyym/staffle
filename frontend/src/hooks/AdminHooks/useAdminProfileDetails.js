import { useMemo, useState } from "react";
import useTasksDetails from "../../utils/useTasksDetails";
import useEmployeesDetails from "../../utils/useEmployeesDetails";
import useOrganizationDetails from "../../utils/useOrganizationDetails";

const useAdminProfileDetails = () => {

    const { tasks, fetchTasksDetails } = useTasksDetails();
    const { employees, fetchEmployees } = useEmployeesDetails();
    const { organization, fetchOrganization } = useOrganizationDetails();

    const [activeTab, setActiveTab] = useState("organization");

    const refreshOrgData = async () => {
        await Promise.all([
            fetchOrganization()
        ]);
    };

    const refreshAdminData = async () => {
        await Promise.all([
            fetchEmployees()
        ]);
    };

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

    const handleOnClickActiveOrg = () => {
        setActiveTab("organization");
    }

    const handleOnClickActiveAdmin = () => {
        setActiveTab("admin");
    }

    return { tasks, organization, admin, activeTab, formattedDOB, orgCountry, refreshOrgData, refreshAdminData, fetchEmployees, fetchTasksDetails, fetchOrganization, handleOnClickActiveOrg, handleOnClickActiveAdmin };
}

export default useAdminProfileDetails;
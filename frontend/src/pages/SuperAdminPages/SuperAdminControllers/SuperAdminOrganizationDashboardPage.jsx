import { Header } from "../../../constants/imports";
import SuperAdminTotalCount from "../../../components/SuperAdmin/SuperAdminTotalCount";
import SuperAdminOrganizationDashboard from "../../../components/SuperAdmin/SuperAdminController/SuperAdminOrganizationDashboard";
import SuperAdminControlledControlPanel from "../../../components/SuperAdmin/SuperAdminController/SuperAdminControlledControlPanel";

const SuperAdminOrganizationDashboardPage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <SuperAdminTotalCount />
            <SuperAdminControlledControlPanel />
            <SuperAdminOrganizationDashboard />
        </div>
    );
};

export default SuperAdminOrganizationDashboardPage;
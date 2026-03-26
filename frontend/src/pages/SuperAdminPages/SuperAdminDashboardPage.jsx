import SuperAdminControlPanel from "../../components/SuperAdmin/SuperAdminControlPanel";
import SuperAdminDashboard from "../../components/SuperAdmin/SuperAdminDashboard";
import SuperAdminOrganizationStatus from "../../components/SuperAdmin/SuperAdminOrganizationStatus";
import SuperAdminTotalCount from "../../components/SuperAdmin/SuperAdminTotalCount";
import { Header } from "../../constants/imports";

const SuperAdminDashboardPage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <SuperAdminTotalCount />
            <SuperAdminControlPanel />
            <SuperAdminOrganizationStatus />
            <SuperAdminDashboard />
        </div>
    );
};

export default SuperAdminDashboardPage;
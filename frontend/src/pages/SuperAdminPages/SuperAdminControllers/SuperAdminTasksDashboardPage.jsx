import { Header } from "../../../constants/imports";
import SuperAdminTotalCount from "../../../components/SuperAdmin/SuperAdminTotalCount";
import SuperAdminTasksDashboard from "../../../components/SuperAdmin/SuperAdminController/SuperAdminTasksDashboard";
import SuperAdminControlledControlPanel from "../../../components/SuperAdmin/SuperAdminController/SuperAdminControlledControlPanel";

const SuperAdminTasksDashboardPage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <SuperAdminTotalCount />
            <SuperAdminControlledControlPanel />
            <SuperAdminTasksDashboard />
        </div>
    );
};

export default SuperAdminTasksDashboardPage;
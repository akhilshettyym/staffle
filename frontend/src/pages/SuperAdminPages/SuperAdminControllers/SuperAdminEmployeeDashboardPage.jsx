import { Header } from "../../../constants/imports";
import SuperAdminTotalCount from "../../../components/SuperAdmin/SuperAdminTotalCount";
import SuperAdminEmployeeDashboard from "../../../components/SuperAdmin/SuperAdminController/SuperAdminEmployeeDashboard";
import SuperAdminControlledControlPanel from "../../../components/SuperAdmin/SuperAdminController/SuperAdminControlledControlPanel";

const SuperAdminEmployeeDashboardPage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <SuperAdminTotalCount />
            <SuperAdminControlledControlPanel />
            <SuperAdminEmployeeDashboard />
        </div>
    );
};

export default SuperAdminEmployeeDashboardPage;
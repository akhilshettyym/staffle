import { Header } from "../../../constants/imports";
import SuperAdminTotalCount from "../../../components/SuperAdmin/SuperAdminTotalCount";
import SuperAdminAdminDashboard from "../../../components/SuperAdmin/SuperAdminController/SuperAdminAdminDashboard";
import SuperAdminControlledControlPanel from "../../../components/SuperAdmin/SuperAdminController/SuperAdminControlledControlPanel";

const SuperAdminAdminDashboardPage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <SuperAdminTotalCount />
            <SuperAdminControlledControlPanel />
            <SuperAdminAdminDashboard />
        </div>
    );
};

export default SuperAdminAdminDashboardPage;
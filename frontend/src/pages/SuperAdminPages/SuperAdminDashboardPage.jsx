import SuperAdminControlPanel from "../../components/SuperAdmin/SuperAdminControlPanel";
import { Header } from "../../constants/imports";

const SuperAdminDashboardPage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <SuperAdminControlPanel />
        </div>
    );
};

export default SuperAdminDashboardPage;
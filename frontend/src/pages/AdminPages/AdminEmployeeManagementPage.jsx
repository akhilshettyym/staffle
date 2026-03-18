import AdminControlPanel from "../../components/Admin/AdminControlPanel";
import AdminEmployeeManager from "../../components/Admin/AdminEmployeeManager";
import Header from "../../components/Basics/Header";

const AdminEmployeeManagementPage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <AdminControlPanel />
            <AdminEmployeeManager />
        </div>
    );
};

export default AdminEmployeeManagementPage;
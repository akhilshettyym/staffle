import AdminControlPanel from "../../components/Admin/AdminControlPanel";
import AdminEmployeeManager from "../../components/Admin/AdminEmployeeManager";
import { Header } from "../../constants/imports";

const AdminEmployeeManagementPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControlPanel />
            <AdminEmployeeManager />
        </div>
    );
};

export default AdminEmployeeManagementPage;
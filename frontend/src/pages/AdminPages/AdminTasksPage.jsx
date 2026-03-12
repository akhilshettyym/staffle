import AdminControlPanel from "../../components/Admin/AdminControlPanel";
import AdminTasksTable from "../../components/Admin/AdminTasksTable";
import { Header } from "../../constants/imports";

const AdminTasksPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControlPanel />
            <AdminTasksTable />
        </div>
    );
};

export default AdminTasksPage;
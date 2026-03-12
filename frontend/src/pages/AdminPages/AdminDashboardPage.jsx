import AdminControlPanel from "../../components/Admin/AdminControlPanel";
import AdminCreateTaskForm from "../../components/Admin/AdminCreateTaskForm";
import { Header } from "../../constants/imports";

const AdminDashboardPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControlPanel />
            <AdminCreateTaskForm />
        </div>
    );
};

export default AdminDashboardPage;
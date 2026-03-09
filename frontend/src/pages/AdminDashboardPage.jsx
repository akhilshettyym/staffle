import AdminControlPanel from "../components/AdminControlPanel";
import AdminCreateTaskForm from "../components/AdminCreateTaskForm";
import { Header } from "../constants/imports";

const AdminDashboardPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControlPanel />
            <AdminCreateTaskForm data={data} />
        </div>
    );
};

export default AdminDashboardPage;
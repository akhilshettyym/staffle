import AdminControlPanel from "../../components/Admin/AdminControlPanel";
import AdminCreateTaskForm from "../../components/Admin/AdminCreateTaskForm";
import Header from "../../components/Basics/Header";

const AdminDashboardPage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <AdminControlPanel />
            <AdminCreateTaskForm />
        </div>
    );
};

export default AdminDashboardPage;
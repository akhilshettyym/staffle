import AdminControlPanel from "../../components/Admin/AdminControlPanel";
import AdminEmployeeDetailsCard from "../../components/Admin/AdminEmployeeDetailsCard";
import Header from "../../components/Basics/Header";

const AdminEmployeeDetailsPage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <AdminControlPanel />
            <AdminEmployeeDetailsCard />
        </div>
    );
};

export default AdminEmployeeDetailsPage;
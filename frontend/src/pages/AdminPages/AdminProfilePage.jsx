import AdminControlPanel from "../../components/Admin/AdminControlPanel";
import AdminProfileDetails from "../../components/Admin/AdminProfileDetails";
import Header from "../../components/Basics/Header";

const AdminProfilePage = () => {

    return (
        <div className="h-screen w-full p-10">
            <Header />
            <AdminControlPanel />
            <AdminProfileDetails />
        </div>
    );
};

export default AdminProfilePage;
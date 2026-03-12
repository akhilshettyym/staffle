import AdminControlPanel from "../../components/Admin/AdminControlPanel";
import AdminProfileDetails from "../../components/Admin/AdminProfileDetails";
import { Header } from "../../constants/imports";

const AdminProfilePage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControlPanel />
            <AdminProfileDetails />
        </div>
    );
};

export default AdminProfilePage;
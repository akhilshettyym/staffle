import AdminControlPanel from "../components/AdminControlPanel";
import AdminEmployeeDetailsCard from "../components/AdminEmployeeDetailsCard";
import { Header } from "../constants/imports";

const AdminEmployeeDetailsPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControlPanel />
            <AdminEmployeeDetailsCard />
        </div>
    );
};

export default AdminEmployeeDetailsPage;
import { Header, AdminControl, Dashboard } from "../../../constants/imports";

const AdminDashboard = ({ data, handleLogout, orgData }) => {
    return (
        <div className="h-screen w-full p-10">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControl />
            <Dashboard data={data} handleLogout={handleLogout} orgData={orgData} />
        </div>
    )
}

export default AdminDashboard;
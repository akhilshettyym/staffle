import { Header, AdminControl, CreateTask } from "../../../constants/imports";

const Dashboard = ({ data, handleLogout, orgData }) => {
    return (
        <div className="h-screen w-full p-10">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControl />
            <CreateTask data={data} />
        </div>
    )
}

export default Dashboard;
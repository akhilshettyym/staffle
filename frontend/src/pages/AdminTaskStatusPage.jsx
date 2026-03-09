import AdminControlPanel from '../components/AdminControlPanel';
import AdminTaskStatusTable from '../components/AdminTaskStatusTable';
import { Header } from '../constants/imports';

const AdminTaskStatusPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-auto">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControlPanel />
            <AdminTaskStatusTable />
        </div>
    );
};

export default AdminTaskStatusPage;
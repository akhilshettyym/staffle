import AdminControlPanel from '../../components/Admin/AdminControlPanel';
import AdminTaskStatusTable from '../../components/Admin/AdminTaskStatusTable';
import { Header } from '../../constants/imports';

const AdminTaskStatusPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControlPanel />
            <AdminTaskStatusTable />
        </div>
    );
};

export default AdminTaskStatusPage;
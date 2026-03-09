
import EmployeeControlPanel from "../components/EmployeeControlPanel";
import EmployeeInProgressTask from "../components/EmployeeInProgressTask";
import { Header } from "../constants/imports";

const EmployeeInProgressTasksPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-auto">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <EmployeeControlPanel />
            <EmployeeInProgressTask />
        </div>
    );
};

export default EmployeeInProgressTasksPage;
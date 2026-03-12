
import EmployeeControlPanel from "../../components/Employee/EmployeeControlPanel";
import EmployeeInProgressTask from "../../components/Employee/EmployeeInProgressTask";
import { Header } from "../../constants/imports";

const EmployeeInProgressTasksPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <EmployeeControlPanel />
            <EmployeeInProgressTask />
        </div>
    );
};

export default EmployeeInProgressTasksPage;
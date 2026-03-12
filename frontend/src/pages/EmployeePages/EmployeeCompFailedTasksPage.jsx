import EmployeeComFailedTasks from "../../components/Employee/EmployeeComFailedTasks";
import EmployeeControlPanel from "../../components/Employee/EmployeeControlPanel";
import { Header } from "../../constants/imports";

const EmployeeCompFailedTasksPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <EmployeeControlPanel />
            <EmployeeComFailedTasks />
        </div>
    );
};

export default EmployeeCompFailedTasksPage;
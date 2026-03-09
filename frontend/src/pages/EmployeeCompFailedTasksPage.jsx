import EmployeeComFailedTasks from "../components/EmployeeComFailedTasks";
import EmployeeControlPanel from "../components/EmployeeControlPanel";
import { Header } from "../constants/imports";

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
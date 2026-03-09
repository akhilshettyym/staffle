import EmployeeControlPanel from "../components/EmployeeControlPanel";
import EmployeeNewTask from "../components/EmployeeNewTask";
import { Header } from "../constants/imports";

const EmployeeNewTasksPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-auto">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <EmployeeControlPanel />
            <EmployeeNewTask />
        </div>
    );
};

export default EmployeeNewTasksPage;
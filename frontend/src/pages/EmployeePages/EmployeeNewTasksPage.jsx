import EmployeeControlPanel from "../../components/Employee/EmployeeControlPanel";
import EmployeeNewTask from "../../components/Employee/EmployeeNewTask";
import { Header } from "../../constants/imports";

const EmployeeNewTasksPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <EmployeeControlPanel />
            <EmployeeNewTask />
        </div>
    );
};

export default EmployeeNewTasksPage;
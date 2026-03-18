import EmployeeControlPanel from "../../components/Employee/EmployeeControlPanel";
import EmployeeNewTask from "../../components/Employee/EmployeeNewTask";
import Header from "../../components/Basics/Header";

const EmployeeNewTasksPage = () => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header />
            <EmployeeControlPanel />
            <EmployeeNewTask />
        </div>
    );
};

export default EmployeeNewTasksPage;
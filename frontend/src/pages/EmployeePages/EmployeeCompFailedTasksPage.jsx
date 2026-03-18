import EmployeeComFailedTasks from "../../components/Employee/EmployeeComFailedTasks";
import EmployeeControlPanel from "../../components/Employee/EmployeeControlPanel";
import Header from "../../components/Basics/Header";

const EmployeeCompFailedTasksPage = () => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header />
            <EmployeeControlPanel />
            <EmployeeComFailedTasks />
        </div>
    );
};

export default EmployeeCompFailedTasksPage;
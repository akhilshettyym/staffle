
import EmployeeControlPanel from "../../components/Employee/EmployeeControlPanel";
import EmployeeInProgressTask from "../../components/Employee/EmployeeInProgressTask";
import Header from "../../components/Basics/Header";

const EmployeeInProgressTasksPage = () => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header />
            <EmployeeControlPanel />
            <EmployeeInProgressTask />
        </div>
    );
};

export default EmployeeInProgressTasksPage;
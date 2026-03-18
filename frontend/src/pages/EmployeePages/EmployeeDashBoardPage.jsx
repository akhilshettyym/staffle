import EmployeeControlPanel from "../../components/Employee/EmployeeControlPanel";
import EmployeeTaskStatus from "../../components/Employee/EmployeeTaskStatus";
import Header from "../../components/Basics/Header";

const EmployeeDashBoardPage = () => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header />
            <EmployeeControlPanel />
            <EmployeeTaskStatus />
        </div>
    );
};

export default EmployeeDashBoardPage;
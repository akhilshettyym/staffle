import EmployeeControlPanel from "../../components/Employee/EmployeeControlPanel";
import EmployeeTaskStatus from "../../components/Employee/EmployeeTaskStatus";
import { Header } from "../../constants/imports";

const EmployeeDashBoardPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <EmployeeControlPanel />
            <EmployeeTaskStatus />
        </div>
    );
};

export default EmployeeDashBoardPage;
import EmployeeControlPanel from "../components/EmployeeControlPanel";
import EmployeeTaskStatus from "../components/EmployeeTaskStatus";
import { Header } from "../constants/imports";

const EmployeeDashBoardPage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-auto">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <EmployeeControlPanel />
            <EmployeeTaskStatus />
        </div>
    );
};

export default EmployeeDashBoardPage;
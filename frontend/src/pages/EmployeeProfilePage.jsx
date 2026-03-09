import EmployeeControlPanel from "../components/EmployeeControlPanel";
import EmployeeProfileDetails from "../components/EmployeeProfileDetails";
import { Header } from "../constants/imports";

const EmployeeProfilePage = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <EmployeeControlPanel />
            <EmployeeProfileDetails />
        </div>
    );
};

export default EmployeeProfilePage;
import EmployeeControlPanel from "../../components/Employee/EmployeeControlPanel";
import EmployeeProfileDetails from "../../components/Employee/EmployeeProfileDetails";
import Header from "../../components/Basics/Header";

const EmployeeProfilePage = () => {

    return (
        <div className="h-screen w-full p-10 overflow-visible">
            <Header />
            <EmployeeControlPanel />
            <EmployeeProfileDetails />
        </div>
    );
};

export default EmployeeProfilePage;
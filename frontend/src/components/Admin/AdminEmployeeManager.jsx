import { useEffect } from "react";
import AdminAddEmployeeForm from "./AdminAddEmployeeForm";
import AdminAddEmployees from "./AdminAddEmployees";
import CustomTooltip from "../Basics/CustomTooltip";
import useAdminEmployeeManager from "../../hooks/useAdminEmployeeManager";

const AdminEmployeeManager = () => {

    const { employees, setEmployees, fetchEmployees } = useAdminEmployeeManager();

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <>
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Employee Management </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <div className="flex items-center gap-2 mb-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Add more employees to the Org. </h1>
                <CustomTooltip id="add-employees-tooltip" message="You can update the organization roster by adding more employees." place="right" />
            </div>

            <AdminAddEmployeeForm refreshEmployees={fetchEmployees} />

            <div className="flex items-center gap-2">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Remove Employees from the Org. </h1>
                <CustomTooltip id="remove-employees-tooltip" message="Employees may be deactivated and later reactivated, but accounts remaining inactive for more than 30 days will be permanently deleted." place="right" />
            </div>

            <AdminAddEmployees employees={employees} setEmployees={setEmployees} />
        </>
    )
}

export default AdminEmployeeManager;
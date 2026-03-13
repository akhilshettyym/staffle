import { useEffect } from "react";
import AdminAddEmployeeForm from "./AdminAddEmployeeForm";
import AdminAddedEmployees from "./AdminAddedEmployees";
import CustomTooltip from "../Basics/CustomTooltip";
import useAdminEmployeeManager from "../../hooks/AdminHooks/useAdminEmployeeManager";
import AdminInactiveEmployees from "./AdminInactiveEmployees";

const AdminEmployeeManager = () => {

    const { employees, inactiveEmp, setInactiveEmp, setEmployees, fetchEmployees, fetchInactiveEmployees } = useAdminEmployeeManager();

    useEffect(() => {
        fetchEmployees();
        fetchInactiveEmployees();
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

            {console.log(employees)}

            <AdminAddEmployeeForm refreshEmployees={fetchEmployees} />

            <div className="flex items-center gap-2">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Update / Remove Employees from the Org. </h1>
                <CustomTooltip id="remove-employees-tooltip" message="Employees may be deactivated and later reactivated, but accounts remaining inactive for more than 30 days will be permanently deleted." place="right" />
            </div>

            <AdminAddedEmployees employees={employees} setEmployees={setEmployees} />

            <hr className="my-5 border border-[#FFDAB3]/40" />

            <div className="flex items-center gap-2 mb-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Deactivated Employees </h1>
                <CustomTooltip id="deactivated-employees-tooltip" message="Employees who were deactivated can be reactivated, but accounts remaining inactive for more than 30 days will be permanently deleted." place="right" />
            </div>

            <AdminInactiveEmployees inactiveEmp={inactiveEmp} setInactiveEmp={setInactiveEmp} />

        </>
    )
}

export default AdminEmployeeManager;
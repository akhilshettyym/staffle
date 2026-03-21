import { useEffect, useState } from "react";
import AdminAddEmployeeForm from "./AdminAddEmployeeForm";
import AdminAddedEmployees from "./AdminAddedEmployees";
import CustomTooltip from "../Basics/CustomTooltip";
import useAdminEmployeeManager from "../../hooks/AdminHooks/useAdminEmployeeManager";
import AdminInactiveEmployees from "./AdminInactiveEmployees";
import { getTaskDetails } from "../../api/tasks";
import toast from "react-hot-toast";
import EmployeeTaskListNo from "../Employee/EmployeeTaskListNo";

const AdminEmployeeManager = () => {

    const [tasks, setTasks] = useState([]);

    const { employees, inactiveEmp, setInactiveEmp, setEmployees, fetchEmployees, fetchInactiveEmployees, refreshEmployeesData } = useAdminEmployeeManager();
    
    const fetchTasksDetails = async () => {
        try {
            const response = await getTaskDetails();
            if (response?.success) {
                setTasks(response.tasks || []);
            } else {
                toast.error(response?.message || "Failed to load tasks");
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
            toast.error("Could not fetch tasks");
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchTasksDetails();
        fetchInactiveEmployees();
    }, []);

    return (
        <>
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Employee Management </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <EmployeeTaskListNo tasks={tasks} />

            <div className="flex items-center gap-2 mb-5 mt-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Add more employees to the Org. </h1>
                <CustomTooltip id="add-employees-tooltip" message="You can update the organization roster by adding more employees." place="right" />
            </div>

            <AdminAddEmployeeForm refreshEmployees={fetchEmployees} />

            <div className="flex items-center gap-2">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Update / Remove Employees from the Org. </h1>
                <CustomTooltip id="remove-employees-tooltip" message="Employees may be deactivated and later reactivated, but accounts remaining inactive for more than 30 days will be permanently deleted." place="right" />
            </div>

            <AdminAddedEmployees refreshEmployees={refreshEmployeesData} employees={employees} setEmployees={setEmployees} />

            <hr className="my-5 border border-[#FFDAB3]/40" />

            <div className="flex items-center gap-2 mb-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Deactivated Employees </h1>
                <CustomTooltip id="deactivated-employees-tooltip" message="Employees who were deactivated can be reactivated, but accounts remaining inactive for more than 30 days will be permanently deleted." place="right" />
            </div>

            <AdminInactiveEmployees refreshEmployees={refreshEmployeesData} inactiveEmp={inactiveEmp} setInactiveEmp={setInactiveEmp} />

        </>
    )
}

export default AdminEmployeeManager;
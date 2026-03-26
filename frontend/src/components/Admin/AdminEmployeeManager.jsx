import { useEffect } from "react";
import AdminAddEmployeeForm from "./AdminAddEmployeeForm";
import AdminAddedEmployees from "./AdminAddedEmployees";
import CustomTooltip from "../Basics/CustomTooltip";
import useAdminEmployeeManager from "../../hooks/AdminHooks/useAdminEmployeeManager";
import AdminInactiveEmployees from "./AdminInactiveEmployees";
import TaskListNo from "../Basics/TaskListNo";

const AdminEmployeeManager = () => {

    const { tasks, activeTab, employees, inactiveEmp, setInactiveEmp, setEmployees, fetchEmployees, fetchTasksDetails, fetchInactiveEmployees, refreshEmployeesData, handleOnClickActiveTab, handleOnClickInActiveTab } = useAdminEmployeeManager();

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

            <TaskListNo tasks={tasks} />

            <div className="flex items-center gap-2 mb-5 mt-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium"> Add more employees to the Org. </h1>
                <CustomTooltip id="add-employees-tooltip" message="You can update the organization roster by adding more employees." place="right" />
            </div>

            <AdminAddEmployeeForm refreshEmployees={fetchEmployees} />

            <div className="flex gap-4 mt-8 mb-5">
                <button onClick={handleOnClickActiveTab} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
                        ${activeTab === "active"
                        ? "bg-[#FFDAB3] text-[#1B211A]"
                        : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
                    }`}>
                    Active Employees
                </button>

                <button onClick={handleOnClickInActiveTab} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
                        ${activeTab === "inactive"
                        ? "bg-[#FFDAB3] text-[#1B211A]"
                        : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
                    }`}>
                    Inactive Employees
                </button>
            </div>

            {activeTab === "active" && (
                <AdminAddedEmployees refreshEmployees={refreshEmployeesData} employees={employees} setEmployees={setEmployees} />
            )}

            {activeTab === "inactive" && (
                <AdminInactiveEmployees refreshEmployees={refreshEmployeesData} inactiveEmp={inactiveEmp} setInactiveEmp={setInactiveEmp} />
            )}
        </>
    );
};

export default AdminEmployeeManager;
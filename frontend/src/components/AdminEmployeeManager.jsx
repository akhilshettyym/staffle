import { useEffect } from "react";
import { getOrganizationUsers } from "../api/employee";
import { uuidv4, useState, useNavigate, generateSequentialId, getLocalStorage, setLocalStorage, DatePicker, PasswordToggle, toast } from "../constants/imports";
import AddEmployeeForm from "./AddEmployeeForm";
import AdminAddEmployees from "./AdminAddEmployees";
import CustomTooltip from "./Basics/CustomTooltip";

const AdminEmployeeManager = () => {

    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
            const response = await getOrganizationUsers();
            setEmployees(response?.users || []);
        } catch (error) {
            console.error("Failed to fetch employees", error);
            toast.error("Could not fetch employees");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <>
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Employee Management </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <div className="flex items-center gap-2 mb-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Add more employees / remove </h1>
                <CustomTooltip id="task-status-failed-tooltip" message="You can update the organization roster by adding or removing employees." place="right" />
            </div>

            <AddEmployeeForm refreshEmployees={fetchEmployees} />

            <h1 className="mt-5 font-bold text-[#FFDAB3] text-md uppercase flex"> Remove Employees from the Org. </h1>

            <AdminAddEmployees employees={employees} setEmployees={setEmployees} />
        </>
    )
}

export default AdminEmployeeManager;
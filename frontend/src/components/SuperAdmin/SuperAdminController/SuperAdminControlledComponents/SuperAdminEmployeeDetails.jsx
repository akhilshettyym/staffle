// import AdminAddedEmployees from '../../../Admin/AdminAddedEmployees'
// import AdminInactiveEmployees from '../../../Admin/AdminInactiveEmployees'
// import useAdminEmployeeManager from '../../../../hooks/AdminHooks/useAdminEmployeeManager';
// import { useEffect } from 'react';

// const SuperAdminEmployeeDetails = () => {

//     const { tasks, activeTab, employees, inactiveEmp, setInactiveEmp, setEmployees, fetchEmployees, fetchTasksDetails, fetchInactiveEmployees, refreshEmployeesData, handleOnClickActiveTab, handleOnClickInActiveTab } = useAdminEmployeeManager();

//     useEffect(() => {
//         fetchEmployees();
//         fetchTasksDetails();
//         fetchInactiveEmployees();
//     }, []);


//     return (
//         <div>
//             <div className="flex gap-4 mt-8 mb-5">
//                 <button onClick={handleOnClickActiveTab} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
//                         ${activeTab === "active"
//                         ? "bg-[#FFDAB3] text-[#1B211A]"
//                         : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
//                     }`}>
//                     Active Employees
//                 </button>

//                 <button onClick={handleOnClickInActiveTab} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
//                         ${activeTab === "inactive"
//                         ? "bg-[#FFDAB3] text-[#1B211A]"
//                         : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
//                     }`}>
//                     Inactive Employees
//                 </button>
//             </div>

//             {activeTab === "active" && (
//                 <AdminAddedEmployees refreshEmployees={refreshEmployeesData} employees={employees} setEmployees={setEmployees} />
//             )}

//             {activeTab === "inactive" && (
//                 <AdminInactiveEmployees refreshEmployees={refreshEmployeesData} inactiveEmp={inactiveEmp} setInactiveEmp={setInactiveEmp} />
//             )}
//         </div>
//     )
// }

// export default SuperAdminEmployeeDetails



import { useState, useMemo } from "react";
import AdminAddedEmployees from "../../../Admin/AdminAddedEmployees";
import AdminInactiveEmployees from "../../../Admin/AdminInactiveEmployees";

const SuperAdminEmployeeDetails = ({ employees = [], refreshEmployees }) => {

    const [activeTab, setActiveTab] = useState("active");

    const activeEmployees = useMemo(
        () => employees.filter(emp => emp.employmentStatus === "ACTIVE"),
        [employees]
    );

    const inactiveEmployees = useMemo(
        () => employees.filter(emp => emp.employmentStatus === "IN_ACTIVE"),
        [employees]
    );

    return (
        <div>
            <div className="flex gap-4 mt-8 mb-5">
                <button
                    onClick={() => setActiveTab("active")}
                    className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
                        ${activeTab === "active"
                            ? "bg-[#FFDAB3] text-[#1B211A]"
                            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
                        }`}
                >
                    Active Employees
                </button>

                <button
                    onClick={() => setActiveTab("inactive")}
                    className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
                        ${activeTab === "inactive"
                            ? "bg-[#FFDAB3] text-[#1B211A]"
                            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
                        }`}
                >
                    Inactive Employees
                </button>
            </div>

            {activeTab === "active" && (
                <AdminAddedEmployees
                    employees={activeEmployees}
                    refreshEmployees={refreshEmployees}
                />
            )}

            {activeTab === "inactive" && (
                <AdminInactiveEmployees
                    inactiveEmp={inactiveEmployees}
                    refreshEmployees={refreshEmployees}
                />
            )}
        </div>
    );
};

export default SuperAdminEmployeeDetails;
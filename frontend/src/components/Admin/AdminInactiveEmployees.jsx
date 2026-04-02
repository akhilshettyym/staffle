import { useRef, useEffect } from "react";
import CustomTooltip from "../Basics/CustomTooltip";
import AdminReactivateEmployee from "./AdminReactivateEmployee";

const AdminInactiveEmployees = ({ inactiveEmp = [], setInactiveEmp, refreshEmployees }) => {

    const prevLengthRef = useRef(0);

    useEffect(() => {
        if (!inactiveEmp) return;
        prevLengthRef.current = inactiveEmp.length;
    }, [inactiveEmp]);

    const orderedEmployees = [...inactiveEmp]
        .filter(emp => emp.role !== "ADMIN")
        .reverse();

    return (
        <div>

            <div className="flex items-center gap-2 mb-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Deactivated Employees </h1>
                <CustomTooltip id="deactivated-employees-tooltip" message="Deactivated employees can be restored; accounts inactive for more than 30 days are permanently deleted." place="right" />
            </div>

            <div className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">

                <div className="py-3 px-5 flex items-center rounded-2xl border-2 border-[#EEEFE0]/50">
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Emp ID </h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Name </h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Designation </h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Email </h2>
                    <h2 className="text-[#FFDAB3] text-xl font-bold"> {orderedEmployees.length} </h2>
                </div>

                {orderedEmployees.length === 0 && (
                    <div className="bg-[#1B211A] rounded-2xl p-10 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                        <p className="text-center text-[#F8F8F2]/60"> No Inactive employees found. </p>
                    </div>
                )}

                {orderedEmployees.map((emp, index) => {
                    const renderName = `${emp.firstName} ${emp.lastName}`;

                    return (
                        <div key={emp.id || emp._id} className="bg-[#1B211A] rounded-2xl p-2 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                            <div className="bg-[#2C3930]/30 py-3 px-5 flex items-center rounded-2xl">
                                <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold"> EmpId : {index + 1} </h2>
                                <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold"> {renderName} </h2>
                                <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold"> {emp.designation} </h2>
                                <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold"> {emp.email} </h2>
                                <AdminReactivateEmployee refreshEmployees={refreshEmployees} empId={emp.id || emp._id} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminInactiveEmployees;
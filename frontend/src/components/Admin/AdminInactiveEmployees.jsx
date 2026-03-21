import { useRef, useEffect } from "../../constants/imports";
import AdminReactivateEmployee from "./AdminReactivateEmployee";

const AdminInactiveEmployees = ({ inactiveEmp = [], setInactiveEmp, refreshEmployees }) => {

    const prevLengthRef = useRef(0);

    useEffect(() => {
        if (!inactiveEmp) return;
        prevLengthRef.current = inactiveEmp.length;
    }, [inactiveEmp]);

    return (
        <div className="pb-10">
            <div className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">

                <div className="py-3 px-5 flex items-center rounded-2xl border-2 border-[#EEEFE0]/50">
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Emp ID </h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Name </h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Designation </h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Email </h2>
                    <h2 className="text-[#FFDAB3] text-xl font-bold"> {inactiveEmp.length} </h2>
                </div>

                {inactiveEmp.length === 0 && (
                    <div className="bg-[#1B211A] rounded-2xl p-10 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                        <p className="text-center text-[#F8F8F2]/60"> No Inactive employees found. </p>
                    </div>
                )}

                {inactiveEmp.length > 0 && inactiveEmp.map((emp, index) => {
                    const renderName = `${emp.firstName} ${emp.lastName}`;

                    return (
                        <div key={emp.id} className="bg-[#1B211A] rounded-2xl p-2 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                            <div className="bg-[#2C3930]/30 py-3 px-5 flex items-center rounded-2xl">
                                <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold"> EmpId : {index + 1 || ""} </h2>
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
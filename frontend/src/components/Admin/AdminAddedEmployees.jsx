import { useRef, useEffect } from "../../constants/imports";
import AdminUpdateEmployeeDetails from "./AdminUpdateEmployeeDetails";
import { useState } from "react";
import AdminEmployeeDetailsModal from "./AdminEmployeeDetailsModal";

const AdminAddedEmployees = ({ employees, setEmployees }) => {

  const prevLengthRef = useRef(0);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (!employees) return;
    prevLengthRef.current = employees.length;
  }, [employees]);

  return (
    <div className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">

      <div className="py-3 px-5 flex items-center rounded-2xl border-2 border-[#EEEFE0]/50">
        <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Emp ID </h2>
        <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Name </h2>
        <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Designation </h2>
        <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold"> Email </h2>
        <h2 className="text-[#FFDAB3] text-xl font-bold"> {employees.length} </h2>
      </div>

      {employees.map((emp, index) => {
        const renderName = `${emp.firstName} ${emp.lastName}`;

        return (
          <div key={emp.id} className="bg-[#1B211A] rounded-2xl p-2 mt-5 border border-[#FFDAB3]/30 shadow-inner">
            <div className="bg-[#2C3930]/30 py-3 px-5 flex items-center rounded-2xl">
              <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold"> EmpId : {index + 1 || ""}</h2>
              <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold">{renderName}</h2>
              <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold">{emp.designation}</h2>
              <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold">{emp.email}</h2>

              <AdminUpdateEmployeeDetails emp={emp} setEmployees={setEmployees} />

              <button onClick={() => setSelectedEmployee(emp)} className="mr-3 py-1 px-5 text-sm rounded-md border font-semibold transition border-[#957C62] bg-[#FFDAB3] text-[#2C3930] hover:bg-[#957C62] hover:text-white"> View </button>

            </div>
          </div>
        );
      })}

      {selectedEmployee && (
        <AdminEmployeeDetailsModal emp={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}

    </div>
  );
};

export default AdminAddedEmployees;
import { useEffect, useState } from "react";
import { getOrganizationUsers } from "../api/employee";

const AddedEmployees = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getOrganizationUsers();
                setEmployees(response.users || []);
            } catch (error) {
                console.error("Failed to fetch employees", error);
            }
        };
        fetchEmployees();
    }, []);

    const getAdminDetails = () => {
        return employees
            .filter((emp) => emp.role === "ADMIN")
            .map((emp) => {

                const renderName = `${emp.firstName} ${emp.lastName}`;
                return (
                    <div key={emp._id} className="mt-5 bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/30 shadow-inner">
                        <div className="bg-[#2C3930]/50 py-3 px-5 flex items-center rounded-2xl border border-[#EEEFE0]/50">
                            <h2 className="w-1/4 text-[#FFDAB3] text-lg"> {emp._id} </h2>
                            <h2 className="w-1/4 text-[#FFDAB3] text-lg"> {renderName} </h2>
                            <h2 className="w-1/4 text-[#FFDAB3] text-lg"> {emp.designation} </h2>
                            <h2 className="w-1/4 text-[#FFDAB3] text-lg"> {new Date(emp.dateOfBirth).toLocaleDateString()} </h2>
                            <h2 className="w-1/4 text-[#FFDAB3] text-lg"> {emp.email} </h2>
                        </div>
                    </div>
                );
            });
    };

    return (
        <div className="pb-10">

            {getAdminDetails()}

            <div className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">

                <div className="py-3 px-5 flex items-center rounded-2xl border-2 border-[#EEEFE0]/50">
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold">Emp ID</h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold">Name</h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold">Designation</h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold">Date of Birth</h2>
                    <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold">Email</h2>
                    <h2 className="text-[#FFDAB3] text-xl font-bold">
                        {employees.filter((e) => e.role === "EMPLOYEE").length}
                    </h2>
                </div>

                {employees.filter((emp) => emp.role === "EMPLOYEE").map((emp) => {

                    const renderName = `${emp.firstName} ${emp.lastName}`;
                    return (
                        <div key={emp._id} className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                            <div className="bg-[#2C3930]/50 py-3 px-5 flex items-center rounded-2xl border border-[#EEEFE0]/50">
                                <h2 className="w-1/4 text-[#A7C1A8] text-lg"> {emp._id} </h2>
                                <h2 className="w-1/4 text-[#A7C1A8] text-lg"> {renderName} </h2>
                                <h2 className="w-1/4 text-[#A7C1A8] text-lg"> {emp.designation} </h2>
                                <h2 className="w-1/4 text-[#A7C1A8] text-lg"> {new Date(emp.dateOfBirth).toLocaleDateString()} </h2>
                                <h2 className="w-1/4 text-[#A7C1A8] text-lg"> {emp.email} </h2>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AddedEmployees;
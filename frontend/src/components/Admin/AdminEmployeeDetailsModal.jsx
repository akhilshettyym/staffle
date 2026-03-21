import { DateConversion } from "../../constants/imports";
import AdminDeactivateEmployee from "./AdminDeactivateEmployee";

const AdminEmployeeDetailsModal = ({ emp, onClose, refreshEmployees }) => {

    if (!emp) return null;

    const statusStyles = {
        ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
        "IN-ACTIVE": "bg-red-100 text-red-700 border-red-200",
    };

    const initials = `${emp.firstName?.[0] || ""}${emp.lastName?.[0] || ""}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="w-[92%] max-w-3xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/30 shadow-2xl">

                <div className="flex justify-between items-start px-6 py-5 border-b border-[#FFDAB3]/25">

                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-[#FFDAB3]/20 border border-[#FFDAB3]/30 flex items-center justify-center text-[#FFDAB3] font-bold text-lg"> {initials} </div>

                        <div>
                            <h2 className="text-2xl font-bold text-[#FFDAB3] uppercase tracking-wide"> {emp.firstName} {emp.lastName} </h2>
                            <p className="text-xs text-[#F8F8F2]/60 mt-1 uppercase"> {emp.designation} </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span
                            className={`px-4 py-1 rounded-full border text-xs font-bold uppercase ${statusStyles[emp.employmentStatus] ||
                                "bg-gray-100 text-gray-600 border-gray-200"
                                }`}> {emp.employmentStatus} </span>

                        <span className="px-4 py-1 text-xs rounded-full border border-[#FFDAB3]/40 text-[#FFDAB3] font-semibold uppercase"> {emp.role} </span>

                        <button onClick={onClose} className="ml-2 text-[#FFDAB3] hover:text-red-400 text-xl font-bold transition"> ✕ </button>
                    </div>

                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6 text-md">
                        <div>
                            <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1"> Email </p>
                            <p className="text-[#FFDAB3] font-medium"> {emp.email} </p>
                        </div>

                        <div>
                            <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1"> Organization ID </p>
                            <p className="text-[#FFDAB3] font-medium"> {emp.organizationId} </p>
                        </div>

                        <div>
                            <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1"> Date of Birth </p>
                            <p className="text-[#FFDAB3] font-medium"> {emp.dateOfBirth ? (
                                <DateConversion convertDate={emp.dateOfBirth} />
                            ) : ("Not provided")}
                            </p>
                        </div>

                        <div>
                            <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1"> Employee ID </p>
                            <p className="text-[#FFDAB3] font-medium"> {emp._id || emp.id} </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-[#F8F8F2]/60 text-sm uppercase mb-2"> Designation </p>
                        <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-lg p-3 text-[#FFDAB3] text-md capitalize"> {emp.designation || "No designation provided"} </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button onClick={onClose} className="px-6 py-2 text-sm border border-[#FFDAB3]/40 rounded-md text-[#FFDAB3] hover:bg-[#FFDAB3]/10 transition"> Close </button>
                        <AdminDeactivateEmployee refreshEmployees={refreshEmployees} onClose={onClose} empId={emp.id || emp._id} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminEmployeeDetailsModal;
import { useEffect } from "react";
import AdminAddEmployeeForm from "../Admin/AdminAddEmployeeForm";
import { renderEmployeeDetails } from "../Basics/AddedEmployees";
import useCompleteOrganizationDetails from "../../hooks/AuthHooks/useCompleteOrganizationDetails";

const CompleteOrganizationDetails = () => {

    const { admin, employees, orgCountry, organization, formattedDOB, fetchEmployees, fetchOrganization, handleRegisterOrg } = useCompleteOrganizationDetails();

    useEffect(() => {
        fetchEmployees();
        fetchOrganization();
    }, []);

    return (
        <div className="h-screen w-full p-10 bg-[#0F1412] overflow-auto">

            <div className="flex flex-col items-center justify-center text-center mb-10">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-[#FFDAB3]"> Complete Your Organization </h1>
                <p className="mt-2 text-sm text-[#FFDAB3]/70"> Register employees for your organization </p>
            </div>

            <div className="w-full bg-[#1B211A] p-10 justify-center rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8 mb-10">
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Organization and Admin details </h2>
                </div>

                <div className="w-full md:w-[48%] flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Org Name : <span className="text-lg font-semibold text-[#FFDAB3]">{organization?.orgName} </span> </label>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Org Country : <span className="text-lg font-semibold text-[#FFDAB3]"> {orgCountry} </span> </label>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Admin Name : <span className="text-lg capitalize font-semibold text-[#FFDAB3]"> {admin ? `${admin.firstName} ${admin.lastName}` : ""} </span></label>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Admin DOB : <span className="text-lg font-semibold text-[#FFDAB3]">{formattedDOB}</span></label>
                    </div>
                </div>

                <div className="w-full md:w-[48%] flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Org Domain : <span className="text-lg lowercase font-semibold text-[#FFDAB3]"> {organization?.orgDomain} </span></label>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Admin Email : <span className="text-lg lowercase font-semibold text-[#FFDAB3]"> {admin?.email} </span></label>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Admin Designation : <span className="text-lg font-semibold text-[#FFDAB3]"> {admin?.designation} </span></label>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Org Description : <span className="text-lg capitalize font-semibold text-[#FFDAB3]"> {organization?.orgDescription} </span> </label>
                    </div>
                </div>
            </div>

            <AdminAddEmployeeForm refreshEmployees={fetchEmployees} />

            {renderEmployeeDetails({ employees })}

            <div className="w-full flex flex-col items-center pt-2">
                <button onClick={handleRegisterOrg} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-14 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> Register Org </button>

                <p className="mt-3 text-sm text-[#FFDAB3]/60 text-center"> You can add more employees later from the dashboard. </p>
            </div>

        </div>
    );
};

export default CompleteOrganizationDetails;
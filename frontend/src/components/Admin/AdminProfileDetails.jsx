import { useEffect } from "../../constants/imports";
import CustomTooltip from "../Basics/CustomTooltip";
import AdminUpdateAdminDetails from "./AdminUpdateAdminDetails";
import AdminUpdateOrganizationDetails from "./AdminUpdateOrganizationDetails";
import useAdminProfileDetails from "../../hooks/AdminHooks/useAdminProfileDetails";

const AdminProfileDetails = () => {

    const { organization, admin, activeTab, setActiveTab, formattedDOB, orgCountry, fetchEmployees, fetchOrganization } = useAdminProfileDetails();

    useEffect(() => {
        fetchEmployees();
        fetchOrganization();
    }, []);

    return (
        <>
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="text-center font-bold text-[#FFDAB3] text-xl uppercase"> Admin Details </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <div className="flex items-center gap-2 mb-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium"> Update Admin / Org details </h1>
                <CustomTooltip id="admin-details-tooltip" message="Amend administrator details as well as organization information." place="right" />
            </div>

            <div className="w-full bg-[#1B211A] p-8 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8 mb-10">

                <div className="w-full">
                    <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Organization and Admin details </h2>
                </div>

                <div className="w-full md:w-[48%] flex flex-col gap-6">

                    <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Org Name :
                        <span className="text-lg font-semibold text-[#FFDAB3]"> {" "} {organization?.orgName} </span>
                    </label>

                    <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Org Country :
                        <span className="text-lg font-semibold text-[#FFDAB3]"> {" "} {orgCountry} </span>
                    </label>

                    <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Admin Name :
                        <span className="text-lg capitalize font-semibold text-[#FFDAB3]"> {" "} {admin ? `${admin.firstName} ${admin.lastName}` : ""} </span>
                    </label>

                    <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Admin DOB :
                        <span className="text-lg font-semibold text-[#FFDAB3]"> {" "} {formattedDOB} </span>
                    </label>

                </div>

                <div className="w-full md:w-[48%] flex flex-col gap-6">

                    <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Org Domain :
                        <span className="text-lg lowercase font-semibold text-[#FFDAB3]"> {" "} {organization?.orgDomain} </span>
                    </label>

                    <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Admin Email :
                        <span className="text-lg lowercase font-semibold text-[#FFDAB3]"> {" "} {admin?.email} </span>
                    </label>

                    <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Admin Designation :
                        <span className="text-lg font-semibold text-[#FFDAB3]"> {" "} {admin?.designation} </span>
                    </label>

                    <label className="text-md uppercase tracking-wider text-[#FFDAB3]/60"> Org Description :
                        <span className="text-lg capitalize font-semibold text-[#FFDAB3]"> {" "} {organization?.orgDescription} </span>
                    </label>

                </div>
            </div>

            <div className="flex gap-4 mb-8">

                <button onClick={() => setActiveTab("organization")}
                    className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
                   ${activeTab === "organization"
                            ? "bg-[#FFDAB3] text-[#1B211A]"
                            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
                        }`}>
                    Update Organization Details
                </button>

                <button onClick={() => setActiveTab("admin")}
                    className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
                   ${activeTab === "admin"
                            ? "bg-[#FFDAB3] text-[#1B211A]"
                            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
                        }`}>
                    Update Admin Details
                </button>

            </div>

            {activeTab === "organization" && <AdminUpdateOrganizationDetails />}
            {activeTab === "admin" && <AdminUpdateAdminDetails />}

        </>
    );
};

export default AdminProfileDetails;
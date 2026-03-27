import { useEffect, useState } from "react";
import useSuperAdminGetOrgSpecificOrganizationDetails from "../../../hooks/SuperAdminHooks/useSuperAdminGetOrgSpecificOrganizationDetails";
import useSuperAdminGetOrgSpecificEmployeeDetails from "../../../hooks/SuperAdminHooks/useSuperAdminGetOrgSpecificEmployeeDetails";
import AdminUpdateOrganizationDetails from "../../Admin/AdminUpdateOrganizationDetails";
import { useParams } from "react-router-dom";

const SuperAdminOrganizationDashboard = () => {

  const { orgId } = useParams();

  const [activeTab, setActiveTab] = useState("organization-details");

  const { specificOrganization, fetchSpecificOrganization } = useSuperAdminGetOrgSpecificOrganizationDetails({ orgId });
  const { orgSpecificEmployees, fetchOrgSpecificEmployees } = useSuperAdminGetOrgSpecificEmployeeDetails({ orgId });

  useEffect(() => {
    if (orgId) {
      fetchSpecificOrganization();
      fetchOrgSpecificEmployees();
    }
  }, [orgId]);

  // const refreshOrgData = async () => {
  //   await Promise.all([
  //     fetchSpecificOrganization(),
  //     fetchOrgSpecificEmployees(),
  //   ]);
  // };

  const admins = orgSpecificEmployees?.filter((emp) => emp.role === "ADMIN") || [];
  const employees = orgSpecificEmployees?.filter((emp) => emp.role === "EMPLOYEE") || [];
  const createdByAdmin = admins?.find((admin) => admin._id === specificOrganization?.createdBy);

  const getCountryName = (code) => {
    const map = {
      IN: "INDIA",
      US: "UNITED STATES",
      UK: "UNITED KINGDOM",
      CA: "CANADA",
    };
    return map[code?.toUpperCase()] || code;
  };

  const Row = ({ label, value }) => (
    <div className="flex justify-between text-sm">
      <span className="text-[#F8F8F2]/60"> {label} </span>
      <span className="text-[#FFDAB3] font-semibold text-right"> {value} </span>
    </div>
  );

  return (
    <div className="pb-10">

      <div className="flex gap-4 mt-5">
        <button onClick={() => setActiveTab("organization-details")} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
          ${activeTab === "organization-details"
            ? "bg-[#FFDAB3] text-[#1B211A]"
            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
          }`}>
          Organization Details
        </button>

        <button onClick={() => setActiveTab("update-organization")} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
          ${activeTab === "update-organization"
            ? "bg-[#FFDAB3] text-[#1B211A]"
            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
          }`}>
          Update Organization
        </button>
      </div>

      <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25 mt-5 pb-5">

        {activeTab === "organization-details" && (
          <div className="mt-2 space-y-4">

            <div className="flex justify-between items-center px-2 border-b border-[#FFDAB3]/20 pb-2">
              <h2 className="text-xl font-bold text-[#FFDAB3] uppercase"> {specificOrganization?.orgName} </h2>

              <p className="text-sm text-[#F8F8F2]/60"> {specificOrganization?.orgDomain} </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-lg p-3">
                <p className="text-[10px] text-[#F8F8F2]/60 uppercase"> Admins </p>
                <p className="text-xl text-[#FFDAB3] font-bold"> {admins.length} </p>
              </div>

              <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-lg p-3">
                <p className="text-[10px] text-[#F8F8F2]/60 uppercase"> Employees </p>
                <p className="text-xl text-[#FFDAB3] font-bold"> {employees.length} </p>
              </div>

              <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-lg p-3">
                <p className="text-[10px] text-[#F8F8F2]/60 uppercase"> Total </p>
                <p className="text-xl text-[#FFDAB3] font-bold"> {orgSpecificEmployees?.length || 0} </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#2C3930]/20 border border-[#FFDAB3]/20 rounded-lg p-4 space-y-2">
                <p className="text-sm text-[#FFDAB3] font-semibold uppercase"> Organization </p>
                <Row label="Country" value={getCountryName(specificOrganization?.orgCountry)} />
                <Row label="Status" value={specificOrganization?.status} />
                <Row label="Created" value={specificOrganization?.createdAt && new Date(specificOrganization.createdAt).toLocaleDateString()} />
                <Row label="Org ID" value={specificOrganization?._id} />
              </div>

              {createdByAdmin && (
                <div className="bg-[#2C3930]/20 border border-[#FFDAB3]/20 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-[#FFDAB3] font-semibold uppercase"> Admin </p>
                  <Row label="Name" value={`${createdByAdmin?.firstName} ${createdByAdmin?.lastName}`} />
                  <Row label="Email" value={createdByAdmin?.email} />
                  <Row label="Designation" value={createdByAdmin?.designation} />
                  <Row label="Status" value={createdByAdmin?.employmentStatus} />
                </div>
              )}
            </div>

            <div>
              <p className="text-[10px] text-[#F8F8F2]/60 uppercase mb-1"> Description </p>

              <div className="bg-[#2C3930]/20 border border-[#FFDAB3]/20 rounded-lg p-3 text-[#FFDAB3] text-sm">
                {specificOrganization?.orgDescription || "No description provided"}
              </div>
            </div>

          </div>
        )}

        {activeTab === "update-organization" && (
          <div className="mt-6">
            UI FOR UPDATE ORG
          </div>
        )}

      </div>
    </div>
  );
};

export default SuperAdminOrganizationDashboard;
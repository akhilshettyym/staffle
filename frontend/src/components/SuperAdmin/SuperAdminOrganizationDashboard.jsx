import { useEffect, useState } from "react";
import SuperAdminViewOrganization from "../SuperAdmin/SuperAdminViewOrganization";
import SuperAdminUpdateOrganization from "../SuperAdmin/SuperAdminUpdateOrganization";
import useSuperAdminOrganizationDashboard from "../../hooks/SuperAdminHooks/useSuperAdminOrganizationDashboard";

const SuperAdminOrganizationDashboard = () => {

  const { orgId, activeTab, setActiveTab, specificOrganization, fetchSpecificOrganization, orgSpecificEmployees, fetchOrgSpecificEmployees, admins, employees, createdByAdmin } = useSuperAdminOrganizationDashboard();

  useEffect(() => {
    if (orgId) {
      fetchSpecificOrganization();
      fetchOrgSpecificEmployees();
    }
  }, [orgId]);

  return (
    <div className="pb-10">

<hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Organization Details </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

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
          <SuperAdminViewOrganization specificOrganization={specificOrganization} admins={admins} employees={employees} orgSpecificEmployees={orgSpecificEmployees} createdByAdmin={createdByAdmin} />
        )}

        {activeTab === "update-organization" && (
          <SuperAdminUpdateOrganization organization={specificOrganization} refreshOrganization={fetchSpecificOrganization} />
        )}

      </div>
    </div>
  );
};

export default SuperAdminOrganizationDashboard;
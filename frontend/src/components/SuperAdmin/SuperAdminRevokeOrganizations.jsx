import { useEffect } from "react";
import useSuperAdminRevokeOrganizations from "../../hooks/SuperAdminHooks/useSuperAdminRevokeOrganizations";

const SuperAdminRevokeOrganizations = () => {

  const { loadingId, fetchAllOrganization, allEmployees, fetchAllEmployees, activeOrganizations, getCountryName, handleRevokeOrgs } = useSuperAdminRevokeOrganizations();

  useEffect(() => {
    fetchAllOrganization();
    fetchAllEmployees();
  }, []);

  return (
    <div className="pb-10 mt-5">

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Revoke Organization </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      {activeOrganizations.length === 0 ? (
        <div className="bg-[#1B211A] rounded-2xl p-10 mt-5 border border-[#FFDAB3]/30 shadow-inner">
          <p className="text-center text-[#F8F8F2]/60 text-sm">
            No active organizations to revoke
          </p>
        </div>
      ) : (

        <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {activeOrganizations.map((org) => {

              const orgId = org?._id || org?.id;

              const createdByEmployee = allEmployees?.find((emp) => (emp?._id || emp?.id) === org?.createdBy);
              const createdByName = createdByEmployee ? `${createdByEmployee?.firstName} ${createdByEmployee?.lastName}` : "-";

              return (
                <div key={orgId} className="bg-[#FFDAB3]/10 rounded-2xl border border-[#FFDAB3]/30 hover:border-[#FFDAB3]/50 transition flex flex-col">

                  <div className="px-2 py-2 border-b border-[#FFDAB3]/20">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/25">
                      <div>
                        <h3 className="text-[#FFDAB3] font-semibold text-base uppercase line-clamp-1"> {org.orgName} </h3>
                        <p className="text-xs text-[#F8F8F2]/60 mt-1"> {org.orgDomain} </p>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-orange-500/10 text-orange-400 border-orange-500/30"> Active </span>
                    </div>
                  </div>

                  <div className="px-4 py-4 flex flex-col gap-3 text-sm text-[#F8F8F2]/85 flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium"> Country </span>
                      <span className="text-[#FFDAB3] font-semibold"> {getCountryName(org?.orgCountry)} </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium"> Created By </span>
                      <span className="text-[#FFDAB3] font-semibold"> {createdByName} </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium"> Created On </span>
                      <span className="text-[#FFDAB3] font-semibold"> {new Date(org.createdAt).toLocaleDateString()} </span>
                    </div>

                    <div>
                      <span className="font-medium"> Description : </span>
                      <span className="text-[#FFDAB3] ml-1"> {org.orgDescription || "No description provided"} </span>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t border-[#FFDAB3]/20 bg-[#1B211A] flex justify-between items-center rounded-b-2xl">
                    <span className="text-xs text-[#F8F8F2]/60"> Org ID : {orgId} </span>

                    <button onClick={() => handleRevokeOrgs(orgId)} disabled={loadingId === orgId} className="py-2 px-6 text-xs rounded-md border font-semibold transition border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white disabled:opacity-50"> {loadingId === orgId ? "Revoking..." : "Revoke"} </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminRevokeOrganizations;
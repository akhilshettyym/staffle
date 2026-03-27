import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminViewOrgModal from "./SuperAdminViewOrgModal";
import useAllTasksDetails from "../../utils/superAdminDashboard/useAllTasksDetails";
import useAllEmployeeDetails from "../../utils/superAdminDashboard/useAllEmployeeDetails";
import useAllOrganizationDetails from "../../utils/superAdminDashboard/useAllOrganizationDetails";
// import { useDispatch } from "react-redux";
// import { setActiveOrgId, fetchSuperAdminOrganization } from "../../slices/superAdminOrgSlice"

const SuperAdminDashboard = () => {

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { allOrganization, fetchAllOrganization } = useAllOrganizationDetails();
  const { allEmployees, fetchAllEmployees } = useAllEmployeeDetails();
  const { allTasks, fetchAllTasks } = useAllTasksDetails();

  const [selectedOrg, setSelectedOrg] = useState(null);
  const [enterOrg, setEnterOrg] = useState(null);

  const activeOrganizations = allOrganization?.filter(org => org?.status === "ACTIVE") || [];

  useEffect(() => {
    fetchAllOrganization();
    fetchAllEmployees();
    fetchAllTasks();
  }, []);

  const getCountryName = (code) => {
    const countryMap = {
      IN: "INDIA",
      US: "UNITED STATES",
      UK: "UNITED KINGDOM",
      CA: "CANADA"
    };

    return countryMap[code?.toUpperCase()] || code;
  };

  const handleEnterOrg = () => {
    //   dispatch(setActiveOrgId(enterOrg));
    //   dispatch(fetchSuperAdminOrganization(enterOrg));
    navigate(`/superadmin/control/organization-dashboard/${enterOrg}`);
  };

  return (
    <div className="pb-10 pt-5">

      <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">

        {activeOrganizations.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[#FFDAB3] text-lg font-semibold"> No Organizations Created </p>
            <p className="text-[#F8F8F2]/60 text-sm mt-2">
              Organizations will appear here once they are created
            </p>
          </div>

        ) : (

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

                      <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-green-500/10 text-green-400 border-green-500/30"> Active </span>
                    </div>
                  </div>

                  <div className="px-4 py-4 flex flex-col gap-3 text-sm text-[#F8F8F2]/85 flex-1">
                    <div className="flex justify-between">
                      <span> Country </span>
                      <span className="text-[#FFDAB3] font-semibold">
                        {getCountryName(org?.orgCountry)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span> Created By </span>
                      <span className="text-[#FFDAB3] font-semibold"> {createdByName} </span>
                    </div>

                    <div className="flex justify-between">
                      <span> Created On </span>
                      <span className="text-[#FFDAB3] font-semibold">
                        {new Date(org.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t border-[#FFDAB3]/20 bg-[#1B211A] flex justify-between items-center rounded-b-2xl">
                    <span className="text-xs text-[#F8F8F2]/60"> Org ID : {orgId} </span>

                    <div className="flex gap-2">
                      <button onClick={() => setSelectedOrg(org)} className="py-2 px-5 text-xs rounded-md border font-semibold transition border-[#FFDAB3] text-[#FFDAB3] hover:bg-[#FFDAB3] hover:text-black"> View </button>

                      <button onClick={() => setEnterOrg(org?._id || org?.id)} className="py-2 px-5 text-xs rounded-md border font-semibold transition border-[#FFDAB3] text-[#FFDAB3] hover:bg-[#FFDAB3] hover:text-black"> Enter Org </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedOrg && (
        <SuperAdminViewOrgModal org={selectedOrg} allEmployees={allEmployees} allTasks={allTasks} onClose={() => setSelectedOrg(null)} />
      )}

      {enterOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-6 w-105">
            <h2 className="text-[#FFDAB3] text-lg font-semibold"> Enter Organization </h2>

            <p className="text-[#F8F8F2]/70 text-sm mt-3">
              You are about to enter this organization as Admin.
              You will gain full control.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEnterOrg(null)} className="px-4 py-2 text-sm border border-[#FFDAB3]/30 text-[#F8F8F2] rounded-md hover:bg-[#FFDAB3]/10"> Cancel </button>

              <button onClick={handleEnterOrg} className="px-4 py-2 text-sm rounded-md bg-[#FFDAB3] text-black font-semibold hover:opacity-90" > Enter Organization </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminDashboard;
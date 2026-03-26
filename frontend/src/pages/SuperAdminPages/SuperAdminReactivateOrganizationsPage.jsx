import SuperAdminControlPanel from "../../components/SuperAdmin/SuperAdminControlPanel";
import SuperAdminOrganizationStatus from "../../components/SuperAdmin/SuperAdminOrganizationStatus";
import SuperAdminReactivateOrganizations from "../../components/SuperAdmin/SuperAdminReactivateOrganizations";
import SuperAdminTotalCount from "../../components/SuperAdmin/SuperAdminTotalCount";
import { Header } from "../../constants/imports";

const SuperAdminReactivateOrganizationsPage = () => {

  return (
    <div className="h-screen w-full p-10">
      <Header />
      <SuperAdminTotalCount />
      <SuperAdminControlPanel />
      <SuperAdminOrganizationStatus />
      <SuperAdminReactivateOrganizations />
    </div>
  );
};

export default SuperAdminReactivateOrganizationsPage;
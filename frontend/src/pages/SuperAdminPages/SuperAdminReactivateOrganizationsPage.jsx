import SuperAdminControlPanel from "../../components/SuperAdmin/SuperAdminControlPanel";
import SuperAdminReactivateOrganizations from "../../components/SuperAdmin/SuperAdminReactivateOrganizations";
import SuperAdminTotalCount from "../../components/SuperAdmin/SuperAdminTotalCount";
import { Header } from "../../constants/imports";

const SuperAdminReactivateOrganizationsPage = () => {

  return (
    <div className="h-screen w-full p-10">
      <Header />
      <SuperAdminTotalCount />
      <SuperAdminControlPanel />
      <SuperAdminReactivateOrganizations />
    </div>
  );
};

export default SuperAdminReactivateOrganizationsPage;
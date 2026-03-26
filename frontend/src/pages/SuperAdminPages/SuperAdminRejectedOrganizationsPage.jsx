import SuperAdminControlPanel from "../../components/SuperAdmin/SuperAdminControlPanel";
import SuperAdminOrganizationStatus from "../../components/SuperAdmin/SuperAdminOrganizationStatus";
import SuperAdminRejectedOrganizations from "../../components/SuperAdmin/SuperAdminRejectedOrganizations";
import SuperAdminTotalCount from "../../components/SuperAdmin/SuperAdminTotalCount";
import { Header } from "../../constants/imports";

const SuperAdminRejectedOrganizationsPage = () => {

  return (
    <div className="h-screen w-full p-10">
      <Header />
      <SuperAdminTotalCount />
      <SuperAdminControlPanel />
      <SuperAdminOrganizationStatus />
      <SuperAdminRejectedOrganizations />
    </div>
  );
};

export default SuperAdminRejectedOrganizationsPage;
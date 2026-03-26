import SuperAdminControlPanel from "../../components/SuperAdmin/SuperAdminControlPanel";
import SuperAdminOrganizationStatus from "../../components/SuperAdmin/SuperAdminOrganizationStatus";
import SuperAdminRevokeOrganizations from "../../components/SuperAdmin/SuperAdminRevokeOrganizations";
import SuperAdminTotalCount from "../../components/SuperAdmin/SuperAdminTotalCount";
import { Header } from "../../constants/imports";

const SuperAdminRevokeOrganizationsPage = () => {

  return (
    <div className="h-screen w-full p-10">
      <Header />
      <SuperAdminTotalCount />
      <SuperAdminControlPanel />
      <SuperAdminOrganizationStatus />
      <SuperAdminRevokeOrganizations />
    </div>
  );
};

export default SuperAdminRevokeOrganizationsPage;
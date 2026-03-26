import SuperAdminControlPanel from "../../components/SuperAdmin/SuperAdminControlPanel";
import SuperAdminRevokeOrganizations from "../../components/SuperAdmin/SuperAdminRevokeOrganizations";
import SuperAdminTotalCount from "../../components/SuperAdmin/SuperAdminTotalCount";
import { Header } from "../../constants/imports";

const SuperAdminRevokeOrganizationsPage = () => {

  return (
    <div className="h-screen w-full p-10">
      <Header />
      <SuperAdminTotalCount />
      <SuperAdminControlPanel />
      <SuperAdminRevokeOrganizations />
    </div>
  );
};

export default SuperAdminRevokeOrganizationsPage;
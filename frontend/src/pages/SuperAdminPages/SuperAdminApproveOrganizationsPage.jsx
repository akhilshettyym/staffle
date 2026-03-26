import SuperAdminApproveOrganizations from "../../components/SuperAdmin/SuperAdminApproveOrganizations";
import SuperAdminControlPanel from "../../components/SuperAdmin/SuperAdminControlPanel";
import SuperAdminTotalCount from "../../components/SuperAdmin/SuperAdminTotalCount";
import { Header } from "../../constants/imports";

const SuperAdminApproveOrganizationsPage = () => {

  return (
    <div className="h-screen w-full p-10">
      <Header />
      <SuperAdminTotalCount />
      <SuperAdminControlPanel />
      <SuperAdminApproveOrganizations />
    </div>
  );
};

export default SuperAdminApproveOrganizationsPage;
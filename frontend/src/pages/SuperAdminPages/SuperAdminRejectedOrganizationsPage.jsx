import SuperAdminControlPanel from "../../components/SuperAdmin/SuperAdminControlPanel";
import SuperAdminRejectedOrganizations from "../../components/SuperAdmin/SuperAdminRejectedOrganizations";
import SuperAdminTotalCount from "../../components/SuperAdmin/SuperAdminTotalCount";
import { Header } from "../../constants/imports";

const SuperAdminRejectedOrganizationsPage = () => {

  return (
    <div className="h-screen w-full p-10">
      <Header />
      <SuperAdminTotalCount />
      <SuperAdminControlPanel />
      <SuperAdminRejectedOrganizations />
    </div>
  );
};

export default SuperAdminRejectedOrganizationsPage;
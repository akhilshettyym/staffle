import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AdminTasksPage from "./pages/AdminPages/AdminTasksPage";
import AdminProfilePage from "./pages/AdminPages/AdminProfilePage";
import AdminDashboardPage from "./pages/AdminPages/AdminDashboardPage";
import AdminTaskStatusPage from "./pages/AdminPages/AdminTaskStatusPage";
import AdminEmployeeDetailsPage from "./pages/AdminPages/AdminEmployeeDetailsPage";
import AdminEmployeeManagementPage from "./pages/AdminPages/AdminEmployeeManagementPage";

import LoginPage from "./pages/AuthPages/LoginPage";
import LandingPage from "./pages/AuthPages/LandingPage";
import CreateOrganizationPage from "./pages/AuthPages/CreateOrganizationPage";
import RegisterOrganizationPage from "./pages/AuthPages/RegisterOrganizationPage";
import CompleteOrganizationPage from "./pages/AuthPages/CompleteOrganizationPage";

import EmployeeProfilePage from "./pages/EmployeePages/EmployeeProfilePage";
import EmployeeNewTasksPage from "./pages/EmployeePages/EmployeeNewTasksPage";
import EmployeeDashBoardPage from "./pages/EmployeePages/EmployeeDashBoardPage";
import EmployeeCompFailedTasksPage from "./pages/EmployeePages/EmployeeCompFailedTasksPage";
import EmployeeInProgressTasksPage from "./pages/EmployeePages/EmployeeInprogressTasksPage";

import SuperAdminDashboardPage from "./pages/SuperAdminPages/SuperAdminDashboardPage";

import { fetchOrganization } from "./slices/organizationSlice";
import SuperAdminApproveOrganizationsPage from "./pages/SuperAdminPages/SuperAdminApproveOrganizationsPage";
import SuperAdminReactivateOrganizationsPage from "./pages/SuperAdminPages/SuperAdminReactivateOrganizationsPage";
import SuperAdminRevokeOrganizationsPage from "./pages/SuperAdminPages/SuperAdminRevokeOrganizationsPage";
import SuperAdminRejectedOrganizationsPage from "./pages/SuperAdminPages/SuperAdminRejectedOrganizationsPage";
import SuperAdminOrganizationDashboardPage from "./pages/SuperAdminPages/SuperAdminControllers/SuperAdminOrganizationDashboardPage";
import SuperAdminAdminDashboardPage from "./pages/SuperAdminPages/SuperAdminControllers/SuperAdminAdminDashboardPage";
import SuperAdminEmployeeDashboardPage from "./pages/SuperAdminPages/SuperAdminControllers/SuperAdminEmployeeDashboardPage";
import SuperAdminTasksDashboardPage from "./pages/SuperAdminPages/SuperAdminControllers/SuperAdminTasksDashboardPage";
import SuperAdminOrganizationDashboard from "./components/SuperAdmin/SuperAdminController/SuperAdminOrganizationDashboard";

const App = () => {

  const dispatch = useDispatch();

  const { loaded } = useSelector((state) => state.organization);
  const loggedOutUser = useSelector((state) => state.auth?.token);
  const superAdmin = useSelector((state) => state.auth?.role === "SUPER_ADMIN");

  useEffect(() => {
    if (!loaded && loggedOutUser && !superAdmin) {
      dispatch(fetchOrganization());
    }
  }, [loaded, dispatch]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: "#1B211A", color: "#FFDAB3", borderRadius: "12px", border: "1px solid rgba(255,218,179,0.2)" } }} />

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Create Organization / Admin */}
        <Route path="/create-organization" element={<CreateOrganizationPage />} />

        {/* Complete Organization / Add Employee */}
        <Route path="/complete-organization" element={<CompleteOrganizationPage />} />

        {/* Register Organization / Static page with status */}
        <Route path="/register-organization" element={<RegisterOrganizationPage />} />

        {/* Login / Super-Admin / Admin / Employee */}
        <Route path="/login" element={<LoginPage />} />

        {/* ----------------------------------------------------------------------------------------------------------------------- */}

        {/* ADMIN CONTROL */}

        {/* /admin/admin-dashboard - Create Tasks */}
        <Route path="/admin/admin-dashboard" element={<AdminDashboardPage />} />

        {/* /admin/created-tasks - Created Tasks */}
        <Route path="/admin/created-tasks" element={<AdminTasksPage />} />

        {/* /admin/task-status - Tasks Status */}
        <Route path="/admin/task-status" element={<AdminTaskStatusPage />} />

        {/* /admin/employee-details - Employee Details */}
        <Route path="/admin/employee-details" element={<AdminEmployeeDetailsPage />} />

        {/* /admin/employee-management - Employee Management */}
        <Route path="/admin/employee-management" element={<AdminEmployeeManagementPage />} />

        {/* /admin/admin-details - Admin Details */}
        <Route path="/admin/admin-details" element={<AdminProfilePage />} />

        {/* ----------------------------------------------------------------------------------------------------------------------- */}

        {/* EMPLOYEE CONTROL */}

        {/* /employee/employee-dashboard - Task Status */}
        <Route path="/employee/employee-dashboard" element={<EmployeeDashBoardPage />} />

        {/* /employee/new-tasks - New Tasks */}
        <Route path="/employee/new-tasks" element={<EmployeeNewTasksPage />} />

        {/* /employee/inprogress-tasks - In-Progress Tasks */}
        <Route path="/employee/inprogress-tasks" element={<EmployeeInProgressTasksPage />} />

        {/* /employee/completed-failed-tasks - Completed and Failed Tasks */}
        <Route path="/employee/completed-failed-tasks" element={<EmployeeCompFailedTasksPage />} />

        {/* /employee/employee-details */}
        <Route path="/employee/employee-details" element={<EmployeeProfilePage />} />

        {/* ----------------------------------------------------------------------------------------------------------------------- */}

        {/* SUPER ADMIN CONTROl */}

        {/* /superadmin/superadmin-dashboard */}
        <Route path="/superadmin/superadmin-dashboard" element={<SuperAdminDashboardPage />} />

        {/* /superadmin/approve-organizations */}
        <Route path="/superadmin/approve-organizations" element={<SuperAdminApproveOrganizationsPage />} />

        {/* /superadmin/rejected-organizations */}
        <Route path="/superadmin/rejected-organizations" element={<SuperAdminRejectedOrganizationsPage />} />

        {/* /superadmin/revoke-organizations */}
        <Route path="/superadmin/revoke-organizations" element={<SuperAdminRevokeOrganizationsPage />} />

        {/* /superadmin/reactivate-organizations */}
        <Route path="/superadmin/reactivate-organizations" element={<SuperAdminReactivateOrganizationsPage />} />


        {/* /superadmin/control/organization-dashboard */}
        <Route path="/superadmin/control/organization-dashboard/:orgId" element={<SuperAdminOrganizationDashboardPage />} />

        {/* /superadmin/control/admin-dashboard */}
        <Route path="/superadmin/control/admin-dashboard" element={<SuperAdminAdminDashboardPage />} />

        {/* /superadmin/control/employee-dashboard */}
        <Route path="/superadmin/control/employee-dashboard" element={<SuperAdminEmployeeDashboardPage />} />

        {/* /superadmin/control/tasks-dashboard */}
        <Route path="/superadmin/control/tasks-dashboard" element={<SuperAdminTasksDashboardPage />} />

        {/* ----------------------------------------------------------------------------------------------------------------------- */}

      </Routes>
    </>
  );
};

export default App;
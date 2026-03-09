import { useState, useEffect, useContext, AuthContext, Navigate, Route, Routes, useNavigate, getOrganizationData, EmpTaskStatus, TaskLifeCycle, EmployeeEmpDetails, Toaster, toast } from "./constants/imports";
import AdminEmployeeDetailsPage from "./pages/AdminEmployeeDetailsPage";
import AdminEmployeeManagementPage from "./pages/AdminEmployeeManagementPage";
import AdminTaskStatusPage from "./pages/AdminTaskStatusPage";
import CompleteOrganizationPage from "./pages/CompleteOrganizationPage";
import CreateOrganizationPage from "./pages/CreateOrganizationPage";
import EmployeeDashBoardPage from "./pages/EmployeeDashBoardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterOrganizationPage from "./pages/RegisterOrganizationPage";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminTasksPage from "./pages/AdminTasksPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import EmployeeNewTasksPage from "./pages/EmployeeNewTasksPage";
import EmployeeCompFailedTasksPage from "./pages/EmployeeCompFailedTasksPage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";
import EmployeeInProgressTasksPage from "./pages/EmployeeInprogressTasksPage";
// import SuperAdminControl from "./utils/superAdminControl";

const App = () => {
  const navigate = useNavigate();
  const authData = useContext(AuthContext);
  const orgData = getOrganizationData();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ role: parsed.role });
    }
  }, []);


  const loggedInUserData = (() => {
    if (!user || !authData) return null;

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user.role === "admin") {
      return authData?.admin ?? null;
    }

    if (user.role === "employee") {
      return authData?.employees?.find(
        (e) => e.email === storedUser?.employee?.email
      ) ?? null;
    }
    return null;
  })();


  const handleLogin = (email, password) => {
    if (authData?.admin && email === authData.admin.email && password === authData.admin.password) {
      toast.success(`Welcome back ${authData.admin.firstName}`);
      setUser({ role: "admin" });
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", admin: authData.admin }));
      return;
    }

    const employee = authData?.employees?.find(
      (e) => e.email === email && e.password === password
    );

    if (employee) {
      toast.success(`Welcome back ${employee.firstName}`);
      setUser({ role: "employee" });
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", employee }));
      return;
    }

    toast.error("Invalid username or password. Please try again");
  };


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out successfully");
    navigate("/");
  };


  const getDashboardRoute = (user) => {
    if (!user) return "/";
    if (user.role === "admin") return "/admin/dashboard";
    return "/employee/taskstatus";
  };

  const AdminRoute = ({ children }) => {
    if (!user) return <Navigate to="/" />;
    if (user.role !== "admin") return <Navigate to="/employee/taskstatus" />;
    return children;
  };

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

        {/* Super Admin Control */}
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />

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

      </Routes>
    </>
  );
};

export default App;
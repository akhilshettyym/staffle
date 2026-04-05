# File Tree: STAFFLE

```
├── 📁 backend
│   ├── 📁 src
│   │   ├── 📁 config
│   │   │   └── 📄 db.js
│   │   ├── 📁 constants
│   │   │   └── 📄 permissions.js
│   │   ├── 📁 controllers
│   │   │   ├── 📁 AdminControllers
│   │   │   │   ├── 📄 addEmployee.controller.js
│   │   │   │   ├── 📄 createTask.controller.js
│   │   │   │   ├── 📄 deactivateEmployee.controller.js
│   │   │   │   ├── 📄 deleteTask.controller.js
│   │   │   │   ├── 📄 reactivateEmployee.controller.js
│   │   │   │   ├── 📄 reviewTaskRejection.controller.js
│   │   │   │   ├── 📄 updateAdmin.controller.js
│   │   │   │   ├── 📄 updateEmployee.controller.js
│   │   │   │   └── 📄 updateTask.controller.js
│   │   │   ├── 📁 AuthControllers
│   │   │   │   ├── 📄 createOrganization.controller.js
│   │   │   │   ├── 📄 userLogin.controller.js
│   │   │   │   └── 📄 userLogout.controller.js
│   │   │   ├── 📁 EmployeeControllers
│   │   │   │   ├── 📄 acceptTask.controller.js
│   │   │   │   ├── 📄 getOrgInactiveUsers.controller.js
│   │   │   │   ├── 📄 getOrgUsers.controller.js
│   │   │   │   ├── 📄 markTaskAsCompleted.controller.js
│   │   │   │   ├── 📄 markTaskAsFailed.controller.js
│   │   │   │   └── 📄 requestTaskRejection.controller.js
│   │   │   ├── 📁 OrganizationControllers
│   │   │   │   ├── 📄 getOrganizationDetails.controller.js
│   │   │   │   └── 📄 updateOrganization.controller.js
│   │   │   ├── 📁 SuperAdminControllers
│   │   │   │   ├── 📄 addAdmin.controller.js
│   │   │   │   ├── 📄 approveOrganization.controller.js
│   │   │   │   ├── 📄 createNewTask.controller.js
│   │   │   │   ├── 📄 deleteAdminEmployee.controller.js
│   │   │   │   ├── 📄 deleteOrganization.controller.js
│   │   │   │   ├── 📄 getAllEmployees.controller.js
│   │   │   │   ├── 📄 getAllOrganization.controller.js
│   │   │   │   ├── 📄 getAllTasks.controller.js
│   │   │   │   ├── 📄 getSpecificOrgEmployees.controller.js
│   │   │   │   ├── 📄 getSpecificOrgTasks.controller.js
│   │   │   │   ├── 📄 getSpecificOrganization.controller.js
│   │   │   │   ├── 📄 reactivateOrganization.controller.js
│   │   │   │   ├── 📄 rejectOrganization.controller.js
│   │   │   │   ├── 📄 revokeOrganization.controller.js
│   │   │   │   └── 📄 updateNewTask.controller.js
│   │   │   └── 📁 TaskControllers
│   │   │       └── 📄 getTaskDetails.controller.js
│   │   ├── 📁 jobs
│   │   │   ├── 📄 inactiveEmployee.js
│   │   │   └── 📄 taskOverdue.js
│   │   ├── 📁 middleware
│   │   │   ├── 📄 auth.middleware.js
│   │   │   ├── 📄 permission.middleware.js
│   │   │   └── 📄 role.middleware.js
│   │   ├── 📁 models
│   │   │   ├── 📄 org.model.js
│   │   │   ├── 📄 task.model.js
│   │   │   └── 📄 user.model.js
│   │   ├── 📁 routes
│   │   │   ├── 📄 admin.routes.js
│   │   │   ├── 📄 auth.routes.js
│   │   │   ├── 📄 employee.routes.js
│   │   │   ├── 📄 organization.routes.js
│   │   │   ├── 📄 superadmin.routes.js
│   │   │   └── 📄 task.routes.js
│   │   ├── 📁 utils
│   │   │   └── 📄 createSuperAdmin.js
│   │   └── 📄 app.js
│   ├── ⚙️ .gitattributes
│   ├── ⚙️ .gitignore
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 server.js


├── 📁 frontend
│   ├── 📁 public
│   │   └── 🖼️ vite.svg
│   ├── 📁 src
│   │   ├── 📁 api
│   │   │   ├── 📁 helpers
│   │   │   │   └── 📄 apiHelpers.js
│   │   │   ├── 📁 instance
│   │   │   │   └── 📄 axios.js
│   │   │   ├── 📄 admin.js
│   │   │   ├── 📄 auth.js
│   │   │   ├── 📄 employee.js
│   │   │   ├── 📄 organization.js
│   │   │   ├── 📄 superadmin.js
│   │   │   └── 📄 tasks.js
│   │   ├── 📁 assets
│   │   │   └── 🖼️ react.svg
│   │   ├── 📁 components
│   │   │   ├── 📁 Admin
│   │   │   │   ├── 📄 AdminAddEmployeeForm.jsx
│   │   │   │   ├── 📄 AdminAddedEmployees.jsx
│   │   │   │   ├── 📄 AdminControlPanel.jsx
│   │   │   │   ├── 📄 AdminCreateTaskForm.jsx
│   │   │   │   ├── 📄 AdminDeactivateEmployee.jsx
│   │   │   │   ├── 📄 AdminEditTaskModal.jsx
│   │   │   │   ├── 📄 AdminEmployeeDetailsCard.jsx
│   │   │   │   ├── 📄 AdminEmployeeDetailsModal.jsx
│   │   │   │   ├── 📄 AdminEmployeeManager.jsx
│   │   │   │   ├── 📄 AdminInactiveEmployees.jsx
│   │   │   │   ├── 📄 AdminProfileDetails.jsx
│   │   │   │   ├── 📄 AdminReactivateEmployee.jsx
│   │   │   │   ├── 📄 AdminRejectRejectionModal.jsx
│   │   │   │   ├── 📄 AdminRemoveTask.jsx
│   │   │   │   ├── 📄 AdminTaskDetailsModal.jsx
│   │   │   │   ├── 📄 AdminTaskStatusCompletedTasks.jsx
│   │   │   │   ├── 📄 AdminTaskStatusCreatedTasks.jsx
│   │   │   │   ├── 📄 AdminTaskStatusFailedTasks.jsx
│   │   │   │   ├── 📄 AdminTaskStatusInProgressTasks.jsx
│   │   │   │   ├── 📄 AdminTaskStatusReqRejection.jsx
│   │   │   │   ├── 📄 AdminTaskStatusTable.jsx
│   │   │   │   ├── 📄 AdminTasksTable.jsx
│   │   │   │   ├── 📄 AdminUpdateAdminDetails.jsx
│   │   │   │   ├── 📄 AdminUpdateEmployeeDetails.jsx
│   │   │   │   └── 📄 AdminUpdateOrganizationDetails.jsx
│   │   │   ├── 📁 Auth
│   │   │   │   ├── 📄 CompleteOrganizationDetails.jsx
│   │   │   │   ├── 📄 CreateOrganizationForm.jsx.jsx
│   │   │   │   ├── 📄 Landing.jsx
│   │   │   │   └── 📄 LoginForm.jsx
│   │   │   ├── 📁 Basics
│   │   │   │   ├── 📄 AddedEmployees.jsx
│   │   │   │   ├── 📄 ConfirmModal.jsx
│   │   │   │   ├── 📄 CustomTooltip.jsx
│   │   │   │   ├── 📄 DateConversion.jsx
│   │   │   │   ├── 📄 Header.jsx
│   │   │   │   ├── 📄 PasswordToggle.jsx
│   │   │   │   ├── 📄 PriorityTag.jsx
│   │   │   │   ├── 📄 TaskCount.jsx
│   │   │   │   └── 📄 TaskListNo.jsx
│   │   │   ├── 📁 Employee
│   │   │   │   ├── 📄 EmployeeComFailedTasks.jsx
│   │   │   │   ├── 📄 EmployeeControlPanel.jsx
│   │   │   │   ├── 📄 EmployeeFailedTaskModal.jsx
│   │   │   │   ├── 📄 EmployeeInProgressTask.jsx
│   │   │   │   ├── 📄 EmployeeNewTask.jsx
│   │   │   │   ├── 📄 EmployeeProfileDetails.jsx
│   │   │   │   ├── 📄 EmployeeTaskCard.jsx
│   │   │   │   ├── 📄 EmployeeTaskDetailsModal.jsx
│   │   │   │   └── 📄 EmployeeTaskStatus.jsx
│   │   │   └── 📁 SuperAdmin
│   │   │       ├── 📄 SuperAdminAddMoreAdmins.jsx
│   │   │       ├── 📄 SuperAdminAdminDashboard.jsx
│   │   │       ├── 📄 SuperAdminAdminDetails.jsx
│   │   │       ├── 📄 SuperAdminApproveOrganizations.jsx
│   │   │       ├── 📄 SuperAdminControlPanel.jsx
│   │   │       ├── 📄 SuperAdminControlledControlPanel.jsx
│   │   │       ├── 📄 SuperAdminCreateTaskForm.jsx
│   │   │       ├── 📄 SuperAdminDashboard.jsx
│   │   │       ├── 📄 SuperAdminEditTaskModal.jsx
│   │   │       ├── 📄 SuperAdminEmployeeDashboard.jsx
│   │   │       ├── 📄 SuperAdminEmployeeDetails.jsx
│   │   │       ├── 📄 SuperAdminOrganizationDashboard.jsx
│   │   │       ├── 📄 SuperAdminOrganizationStatus.jsx
│   │   │       ├── 📄 SuperAdminReactivateOrganizations.jsx
│   │   │       ├── 📄 SuperAdminRejectedOrganizations.jsx
│   │   │       ├── 📄 SuperAdminRevokeOrganizations.jsx
│   │   │       ├── 📄 SuperAdminTasksDashboard.jsx
│   │   │       ├── 📄 SuperAdminTotalCount.jsx
│   │   │       ├── 📄 SuperAdminUpdateAdminModal.jsx
│   │   │       ├── 📄 SuperAdminUpdateOrganization.jsx
│   │   │       ├── 📄 SuperAdminViewOrgModal.jsx
│   │   │       └── 📄 SuperAdminViewOrganization.jsx
│   │   ├── 📁 context
│   │   │   └── 📄 AuthProvider.jsx
│   │   ├── 📁 hooks
│   │   │   ├── 📁 AdminHooks
│   │   │   │   ├── 📄 useAdminAddEmployeeForm.js
│   │   │   │   ├── 📄 useAdminAddedEmployees.js
│   │   │   │   ├── 📄 useAdminCreateTaskForm.js
│   │   │   │   ├── 📄 useAdminDeactivateEmployee.js
│   │   │   │   ├── 📄 useAdminDeleteTask.js
│   │   │   │   ├── 📄 useAdminEditTaskModal.js
│   │   │   │   ├── 📄 useAdminEmployeeDetailsCard.js
│   │   │   │   ├── 📄 useAdminEmployeeDetailsModal.js
│   │   │   │   ├── 📄 useAdminEmployeeManager.js
│   │   │   │   ├── 📄 useAdminProfileDetails.js
│   │   │   │   ├── 📄 useAdminReactivateEmployee.js
│   │   │   │   ├── 📄 useAdminRejectRejectionModal.js
│   │   │   │   ├── 📄 useAdminTaskDetailsModal.js
│   │   │   │   ├── 📄 useAdminTaskStatusTable.js
│   │   │   │   ├── 📄 useAdminTasksTable.js
│   │   │   │   ├── 📄 useAdminUpdateAdminDetails.js
│   │   │   │   ├── 📄 useAdminUpdateEmployeeDetails.js
│   │   │   │   └── 📄 useAdminUpdateOrganizationDetails.js
│   │   │   ├── 📁 AuthHooks
│   │   │   │   ├── 📄 useCompleteOrganizationDetails.js
│   │   │   │   ├── 📄 useCreateOrganizationForm.js
│   │   │   │   └── 📄 useLoginForm.js
│   │   │   ├── 📁 BasicHooks
│   │   │   │   └── 📄 useHeader.js
│   │   │   ├── 📁 EmployeeHooks
│   │   │   │   ├── 📄 useEmployeeComFailedTasks.js
│   │   │   │   ├── 📄 useEmployeeFailedTaskModal.js
│   │   │   │   ├── 📄 useEmployeeInProgressTask.js
│   │   │   │   ├── 📄 useEmployeeNewTask.js
│   │   │   │   ├── 📄 useEmployeeProfileDetails.js
│   │   │   │   ├── 📄 useEmployeeTaskCard.js
│   │   │   │   ├── 📄 useEmployeeTaskDetailsModal.js
│   │   │   │   └── 📄 useEmployeeTaskStatus.js
│   │   │   └── 📁 SuperAdminHooks
│   │   │       ├── 📄 useSuperAdminAddMoreAdmins.js
│   │   │       ├── 📄 useSuperAdminAdminDashboard.js
│   │   │       ├── 📄 useSuperAdminAdminDetails.js
│   │   │       ├── 📄 useSuperAdminApproveOrganizations.js
│   │   │       ├── 📄 useSuperAdminCreateTaskForm.js
│   │   │       ├── 📄 useSuperAdminDashboard.js
│   │   │       ├── 📄 useSuperAdminEditTaskModal.js
│   │   │       ├── 📄 useSuperAdminEmployeeDashboard.js
│   │   │       ├── 📄 useSuperAdminGetOrgSpecificEmployeeDetails.js
│   │   │       ├── 📄 useSuperAdminGetOrgSpecificOrganizationDetails.js
│   │   │       ├── 📄 useSuperAdminGetOrgSpecificTasksDetails.js
│   │   │       ├── 📄 useSuperAdminOrganizationDashboard.js
│   │   │       ├── 📄 useSuperAdminReactivateOrganizations.js
│   │   │       ├── 📄 useSuperAdminRejectedOrganizations.js
│   │   │       ├── 📄 useSuperAdminRevokeOrganizations.js
│   │   │       ├── 📄 useSuperAdminTasksDashboard.js
│   │   │       └── 📄 useSuperAdminUpdateOrganization.js
│   │   ├── 📁 pages
│   │   │   ├── 📁 AdminPages
│   │   │   │   ├── 📄 AdminDashboardPage.jsx
│   │   │   │   ├── 📄 AdminEmployeeDetailsPage.jsx
│   │   │   │   ├── 📄 AdminEmployeeManagementPage.jsx
│   │   │   │   ├── 📄 AdminProfilePage.jsx
│   │   │   │   ├── 📄 AdminTaskStatusPage.jsx
│   │   │   │   └── 📄 AdminTasksPage.jsx
│   │   │   ├── 📁 AuthPages
│   │   │   │   ├── 📄 CompleteOrganizationPage.jsx
│   │   │   │   ├── 📄 CreateOrganizationPage.jsx
│   │   │   │   ├── 📄 LandingPage.jsx
│   │   │   │   ├── 📄 LoginPage.jsx
│   │   │   │   └── 📄 RegisterOrganizationPage.jsx
│   │   │   ├── 📁 EmployeePages
│   │   │   │   ├── 📄 EmployeeCompFailedTasksPage.jsx
│   │   │   │   ├── 📄 EmployeeDashBoardPage.jsx
│   │   │   │   ├── 📄 EmployeeInProgressTasksPage.jsx
│   │   │   │   ├── 📄 EmployeeNewTasksPage.jsx
│   │   │   │   └── 📄 EmployeeProfilePage.jsx
│   │   │   └── 📁 SuperAdminPages
│   │   │       ├── 📄 SuperAdminAdminDashboardPage.jsx
│   │   │       ├── 📄 SuperAdminApproveOrganizationsPage.jsx
│   │   │       ├── 📄 SuperAdminDashboardPage.jsx
│   │   │       ├── 📄 SuperAdminEmployeeDashboardPage.jsx
│   │   │       ├── 📄 SuperAdminOrganizationDashboardPage.jsx
│   │   │       ├── 📄 SuperAdminReactivateOrganizationsPage.jsx
│   │   │       ├── 📄 SuperAdminRejectedOrganizationsPage.jsx
│   │   │       ├── 📄 SuperAdminRevokeOrganizationsPage.jsx
│   │   │       └── 📄 SuperAdminTasksDashboardPage.jsx
│   │   ├── 📁 slices
│   │   │   ├── 📄 authSlice.js
│   │   │   ├── 📄 organizationSlice.js
│   │   │   ├── 📄 superAdminOrgSlice.js
│   │   │   └── 📄 taskSlice.js
│   │   ├── 📁 store
│   │   │   └── 📄 store.js
│   │   ├── 📁 utils
│   │   │   ├── 📄 testData.jsx
│   │   │   ├── 📄 useAllEmployeeDetails.js
│   │   │   ├── 📄 useAllOrganizationDetails.js
│   │   │   ├── 📄 useAllTasksDetails.js
│   │   │   ├── 📄 useEmployeesDetails.js
│   │   │   ├── 📄 useOrganizationDetails.js
│   │   │   └── 📄 useTasksDetails.js
│   │   ├── 📄 App.jsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.jsx
│   ├── ⚙️ .eslintrc.cjs
│   ├── ⚙️ .gitignore
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 vite.config.js
└── 📝 README.md
```
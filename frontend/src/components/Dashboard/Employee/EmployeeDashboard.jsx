import { Header, EmployeeControl, TaskStatus, TaskListNo } from "../../../constants/imports";

const EmployeeDashboard = ({ data, handleLogout, orgData }) => {

  if (!data) return null;

  return (
    <div className="p-10 bg-[#21351] h-screen">
      <Header data={data} handleLogout={handleLogout} orgData={orgData} />
      <EmployeeControl />
      <TaskListNo data={data} />
      <TaskStatus data={data} />
    </div>
  )
}

export default EmployeeDashboard;
import { useState, useEffect, Header, DatePicker, EmployeeControl, TaskListNo, toast } from "../../../constants/imports";

const MAX_ATTEMPTS = 3;
const LOCK_TIME = 5 * 60 * 1000;

const inputClass = "mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition";

const EmployeeEmpDetails = ({ data, handleLogout, orgData }) => {
  const [taskbridge, setTaskbridge] = useState(JSON.parse(localStorage.getItem("taskbridge")));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    currentPassword: "",
    newPassword: "",
  });

  const [lockInfo, setLockInfo] = useState(null);

  const employeeIndex = taskbridge?.employees?.findIndex(
    (emp) => emp.id === data?.id
  );

  const employee = taskbridge?.employees?.[employeeIndex];

  useEffect(() => {
    if (!employee) return;
    setFormData({
      firstName: employee.firstName || "",
      lastName: employee.lastName || "",
      dob: employee.dob ? new Date(employee.dob) : null,
      currentPassword: "",
      newPassword: "",
    });

    const lock = JSON.parse(
      localStorage.getItem(`pwd-lock-${employee.id}`)
    );
    setLockInfo(lock);
  }, [employee]);

  const isLocked = () =>
    lockInfo && Date.now() < lockInfo.lockUntil;

  const recordFailedAttempt = () => {
    const attempts = (lockInfo?.attempts || 0) + 1;

    if (attempts >= MAX_ATTEMPTS) {
      const lock = {
        attempts,
        lockUntil: Date.now() + LOCK_TIME,
      };
      localStorage.setItem(`pwd-lock-${employee.id}`, JSON.stringify(lock));
      setLockInfo(lock);
      toast.error("Too many wrong attempts. Locked for 5 minutes.");
    } else {
      const lock = { attempts };
      localStorage.setItem(`pwd-lock-${employee.id}`, JSON.stringify(lock));
      setLockInfo(lock);
      toast.error(`Wrong password (${attempts}/3)`);
    }
  };

  const clearLock = () => {
    localStorage.removeItem(`pwd-lock-${employee.id}`);
    setLockInfo(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLocked()) {
      toast.error("Password update locked. Try again later.");
      return;
    }

    if (!formData.currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (formData.currentPassword !== employee.password) {
      recordFailedAttempt();
      return;
    }

    clearLock();

    const updatedEmployee = {
      ...employee,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      dob: formData.dob
        ? formData.dob.toISOString().split("T")[0]
        : employee.dob,
    };

    let passwordChanged = false;

    if (formData.newPassword) {
      updatedEmployee.password = formData.newPassword;
      passwordChanged = true;
    }

    const updatedEmployees = [...taskbridge.employees];
    updatedEmployees[employeeIndex] = updatedEmployee;

    const updatedStore = {
      ...taskbridge,
      employees: updatedEmployees,
    };

    localStorage.setItem("taskbridge", JSON.stringify(updatedStore));
    setTaskbridge(updatedStore);

    if (passwordChanged) {
      toast("Details updated successfully. Please login again.");
      handleLogout();
    }
  };

  return (
    <div className="h-screen w-full p-10 overflow-auto">
      <Header data={employee} handleLogout={handleLogout} orgData={orgData} />
      <EmployeeControl />

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="text-center font-bold text-[#FFDAB3] text-xl uppercase"> Employee Details </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <TaskListNo data={employee} />

      <div className="mt-5 bg-[#1B211A] p-4 rounded-2xl border border-[#FFDAB3]/30 shadow-sm">
        <div className="flex items-center justify-between gap-4 text-sm font-medium uppercase tracking-wide text-[#FFDAB3]">
          <div>
            <span className="text-[#F8F8F2]/70">ID: </span>
            <span className="font-semibold">{data?.id || "—"}</span>
          </div>
          <div>
            <span className="text-[#F8F8F2]/70">Name: </span>
            <span className="font-semibold">{data?.firstName || "—"} {data?.lastName || "—"}</span>
          </div>
          <div>
            <span className="text-[#F8F8F2]/70">Position: </span>
            <span className="font-semibold">{data?.position || "Not assigned"}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 bg-[#1B211A] p-6 rounded-2xl border border-[#FFDAB3]/40 flex flex-wrap gap-6">
        <div className="w-full md:w-[48%]">
          <label className="text-md uppercase text-[#FFDAB3]/80"> First Name </label>
          <input className={inputClass} value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />

          <label className="mt-4 block text-md uppercase text-[#FFDAB3]/80"> Email </label>
          <input disabled value={employee?.email} className={`${inputClass} opacity-60 cursor-not-allowed`} />

          <label className="mt-4 block text-md uppercase text-[#FFDAB3]/80"> Current Password * </label>
          <input type="password" className={inputClass} value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })} />
        </div>

        <div className="w-full md:w-[48%]">
          <label className="text-md uppercase text-[#FFDAB3]/80"> Last Name </label>
          <input className={inputClass} value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />

          <label className="mt-4 block text-md uppercase text-[#FFDAB3]/80"> DOB </label>
          <DatePicker selected={formData.dob} onChange={(date) => setFormData({ ...formData, dob: date })} dateFormat="dd/MM/yyyy" className={inputClass} />

          <label className="mt-4 block text-md uppercase text-[#FFDAB3]/80"> New Password (optional) </label>
          <input type="password" className={inputClass} value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} />
        </div>

        <div className="w-full flex justify-center pt-6">
          <button type="submit" className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full uppercase"> Update Details </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEmpDetails;
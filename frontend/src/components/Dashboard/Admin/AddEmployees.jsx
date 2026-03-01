import { useRef, useEffect, getLocalStorage, setLocalStorage, RemoveEmp, EditEmployeeDets, toast } from "../../../constants/imports";

const AddEmployees = ({ employees, setEmployees }) => {

  const prevLengthRef = useRef(0);

  useEffect(() => {
    if (!employees) return;
    prevLengthRef.current = employees.length;
  }, [employees]);

  const handleDelete = (empId) => {
    const taskbridge = getLocalStorage();
    taskbridge.employees = taskbridge.employees.filter(
      (emp) => emp.id !== empId
    );
    setLocalStorage(taskbridge);
    setEmployees([...taskbridge.employees]);
    toast.success("Employee removed successfully");
  };

  return (
    <div className="pb-10">
      <div className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">
        <div className="py-3 px-5 flex items-center rounded-2xl border-2 border-[#EEEFE0]/50">
          <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold">Emp ID</h2>
          <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold">Name</h2>
          <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold">Position</h2>
          <h2 className="w-1/4 text-[#FFDAB3] text-xl font-bold">Email</h2>
          <h2 className="text-[#FFDAB3] text-xl font-bold">
            {employees.length}
          </h2>
        </div>

        {employees.map((emp) => {
          const renderName = `${emp.firstName} ${emp.lastName}`;
          return (
            <div key={emp.uuid} className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">
              <div className="bg-[#2C3930]/50 py-3 px-5 flex items-center rounded-2xl border border-[#EEEFE0]/50">
                <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold">{emp.id}</h2>
                <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold">{renderName}</h2>
                <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold">{emp.position}</h2>
                <h2 className="w-1/4 text-[#A7C1A8] text-xl font-bold">{emp.email}</h2>
                <EditEmployeeDets emp={emp} setEmployees={setEmployees} />
                <RemoveEmp onDelete={() => handleDelete(emp.id)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddEmployees;
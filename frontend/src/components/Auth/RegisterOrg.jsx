import { useState, useNavigate, DatePicker, uuidv4, generateSequentialId, getLocalStorage, setLocalStorage, PasswordToggle, AddEmployees, toast } from "../../constants/imports";
import "react-datepicker/dist/react-datepicker.css";

const RegisterOrg = () => {
  const navigate = useNavigate();

  const taskbridge = getLocalStorage();
  const [employees, setEmployees] = useState(taskbridge?.employees || []);
  const [dob, setDob] = useState(null);

  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (!taskbridge?.admin || !taskbridge?.organization) {
      toast.error("Please create an organization first.");
      navigate("/signup");
      return;
    }

    if (!dob) {
      toast.error("Please select date of birth");
      return;
    }

    const form = e.target;

    const newEmployee = {
      uuid: `emp-${uuidv4()}`,
      id: generateSequentialId("emp"),
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      position: form.position.value.trim(),
      dob: dob.toISOString().split("T")[0],
      taskNumbers: { active: 0, newTask: 0, completed: 0, failed: 0 },
      tasks: [],
    };

    const emailExists = employees.some(
      (emp) => emp.email === newEmployee.email
    );

    if (emailExists) {
      toast.error("Employee already exists");
      return;
    }

    const updatedEmployees = [...employees, newEmployee];

    setLocalStorage({
      ...taskbridge,
      employees: updatedEmployees,
    });

    setEmployees(updatedEmployees);
    setDob(null);
    form.reset();
    toast.success("Employee added");
  };

  return (
    <div className="h-screen w-full p-10 bg-[#0F1412] overflow-auto">
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-[#FFDAB3]">Complete Your Organization</h1>
        <p className="mt-2 text-sm text-[#FFDAB3]/70"> Register employees for your organization </p>
      </div>

      <div className="w-full flex justify-center">
        <form onSubmit={handleAddEmployee} className="w-full bg-[#1B211A] p-10 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]">Add Employee Details</h2>
          </div>

          <div className="w-full md:w-[48%] flex flex-col gap-6">
            <div>
              <label className="text-sm uppercase tracking-wide text-[#FFDAB3]/80">First Name</label>
              <input name="firstName" required className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" placeholder="Enter first name" />
            </div>

            <div>
              <label className="text-sm uppercase tracking-wide text-[#FFDAB3]/80">Email Address</label>
              <input name="email" type="email" required className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" placeholder="Enter email" />
            </div>
          </div>

          <div className="w-full md:w-[48%] flex flex-col gap-6">
            <div>
              <label className="text-sm uppercase tracking-wide text-[#FFDAB3]/80">Last Name</label>
              <input name="lastName" required className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" placeholder="Enter last name" />
            </div>

            <div>
              <label className="text-sm uppercase tracking-wide text-[#FFDAB3]/80">Password</label>
              <PasswordToggle name="password" placeholder="Create password" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" iconClassName="top-[55%]" />
            </div>
          </div>

          <div className="w-full md:w-[48%] flex flex-col gap-6">
            <div>
              <label className="text-sm uppercase tracking-wide text-[#FFDAB3]/80">Position</label>
              <input name="position" required className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" placeholder="Frontend, Backend, FullStack, QA, BA ..." />
            </div>
          </div>

          <div className="w-full md:w-[48%] flex flex-col gap-6">
            <div>
              <label className="text-sm uppercase tracking-wide text-[#FFDAB3]/80 mr-10"> Date of Birth </label>
              <DatePicker selected={dob} onChange={setDob} placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy" maxDate={new Date()} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={80} className="mt-8 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
            </div>
          </div>

          <div className="w-full flex flex-col items-center pt-2">
            <button type="submit" className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> Add Employee </button>
          </div>
        </form>
      </div>

      <hr className="my-6 border-2 border-[#FFDAB3]/40" />

      <AddEmployees employees={employees} setEmployees={setEmployees} />

      <div className="w-full flex flex-col items-center pt-2">
        <button onClick={() => {
          toast.success("Organization Registered Successfully..");
          navigate("/signin");
        }} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-14 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> Register Org </button>

        <p className="mt-3 text-sm text-[#FFDAB3]/60 text-center"> You can add more employees later from the dashboard. </p>
      </div>
    </div >
  );
};

export default RegisterOrg;
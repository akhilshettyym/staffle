import { useEffect, DatePicker } from "../../constants/imports";
import CustomTooltip from "../Basics/CustomTooltip";
import useEmployeeProfileDetails from "../../hooks/EmployeeHooks/useEmployeeProfileDetails";
import TaskListNo from "../Basics/TaskListNo";

const EmployeeProfileDetails = () => {

  const {
    loading,
    loggedInUser,
    formData,
    setFormData,
    handleChange,
    handleDateChange,
    handleUpdateEmployee,
    fetchEmployees,
    fetchTasksDetails,
    employeeTasks
  } = useEmployeeProfileDetails();

  useEffect(() => {
    fetchEmployees();
    fetchTasksDetails();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      setFormData({
        firstName: loggedInUser.firstName || "",
        lastName: loggedInUser.lastName || "",
        email: loggedInUser.email || "",
        dateOfBirth: loggedInUser?.dateOfBirth
          ? new Date(loggedInUser.dateOfBirth)
          : null,
        designation: loggedInUser.designation || ""
      });
    }
  }, [loggedInUser]);

  return (
    <div className="pb-10">

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="text-center font-bold text-[#FFDAB3] text-xl uppercase">
        Employee Details
      </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <TaskListNo tasks={employeeTasks} />

      <div className="mt-5 bg-[#1B211A] p-4 rounded-2xl border border-[#FFDAB3]/30 shadow-sm mb-5">
        <div className="flex items-center justify-between gap-4 text-sm font-medium uppercase tracking-wide text-[#FFDAB3]">
          <div>
            <span className="text-[#F8F8F2]/70"> ID: </span>
            <span className="font-semibold">{loggedInUser?.id || "—"}</span>
          </div>

          <div>
            <span className="text-[#F8F8F2]/70"> Name: </span>
            <span className="font-semibold">
              {loggedInUser?.firstName || "—"} {loggedInUser?.lastName || "—"}
            </span>
          </div>

          <div>
            <span className="text-[#F8F8F2]/70"> Designation: </span>
            <span className="font-semibold">
              {loggedInUser?.designation || "Not assigned"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2">
          Employee Profile Details
        </h1>
        <CustomTooltip
          id="employee-details-tooltip"
          message="You can update the employee details here."
          place="right"
        />
      </div>

      <div className="w-full flex justify-center">
        {/* FIXED HERE */}
        <form
          onSubmit={handleUpdateEmployee}
          className="w-full bg-[#1B211A] p-8 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8"
        >

          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]">
              Update Employee Details
            </h2>
          </div>

          <div className="w-full md:w-[48%] flex flex-col gap-6">

            <div>
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80">
                First Name
              </label>
              <input
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition"
              />
            </div>

            <div>
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80">
                Email
              </label>
              <input
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition"
              />
            </div>

          </div>

          <div className="w-full md:w-[48%] flex flex-col gap-6">

            <div>
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80">
                Last Name
              </label>
              <input
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition"
              />
            </div>

            <div>
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80">
                Designation
              </label>
              <input
                required
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition"
              />
            </div>

          </div>

          <div className="w-full flex justify-center">
            <div className="w-[50%] flex flex-col">
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80 flex justify-center">
                Date Of Birth
              </label>

              <DatePicker
                selected={formData.dateOfBirth}
                onChange={handleDateChange}
                placeholderText="Select date of birth"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                wrapperClassName="w-full"
                className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition"
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EmployeeProfileDetails;
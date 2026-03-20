import { useMemo, useState } from "react";
import { useEffect, DatePicker, toast } from "../../constants/imports";
import EmployeeTaskListNo from "./EmployeeTaskListNo";
import { getOrganizationUsers, updateEmployee } from "../../api/employee";
import { useSelector } from "react-redux";
import { getTaskDetails } from "../../api/tasks";
import CustomTooltip from "../Basics/CustomTooltip";

const EmployeeProfileDetails = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const employee = useSelector((state) => state.auth?.user || "");

  const loggedInUser = employees.find((e) => e._id === employee._id || e.id === employee._id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: null,
    designation: ""
  });

  useEffect(() => {
    if (loggedInUser) {
      setFormData({
        firstName: loggedInUser.firstName || "",
        lastName: loggedInUser.lastName || "",
        email: loggedInUser.email || "",
        dateOfBirth: loggedInUser?.dateOfBirth ? new Date(loggedInUser.dateOfBirth) : null,
        designation: loggedInUser.designation || ""
      });
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date
    }));
  };

  const handleUpdateEmployee = async (e) => {

    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (!formData.firstName?.trim()) {
        throw new Error("First Name is required");
      }

      if (!formData.lastName?.trim()) {
        throw new Error("Last Name is required");
      }

      if (!formData.email?.trim()) {
        throw new Error("Email is required");
      }

      if (!formData.dateOfBirth) {
        throw new Error("Date of birth is required");
      }

      if (!formData.designation?.trim()) {
        throw new Error("Designation is required");
      }

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        dateOfBirth: formData.dateOfBirth.toISOString(),
        designation: formData.designation.trim()
      };

      const empId = loggedInUser?._id || loggedInUser?.id;

      if (!empId) {
        throw new Error("Employee Id missing");
      }

      const response = await updateEmployee({ empId, ...payload });

      if (!response?.success) {
        throw new Error(response?.message || "Failed to update employee");
      }

      toast.success("Employee details updated successfully");

      setEmployees((prev) =>
        prev.map((e) =>
          (e._id === empId || e.id === empId)
            ? { ...e, ...payload }
            : e
        )
      );

    } catch (error) {
      let msg = "Something went wrong while updating employee details";
      if (error.response?.data?.message) {
        msg = error.response.data.message;
      } else if (error.message) {
        msg = error.message;
      }
      console.error("Employee updation failed", error);
      toast.error(msg);

    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getOrganizationUsers();
      setEmployees(response?.users || []);
    } catch (error) {
      console.error("Failed to fetch employees", error);
      toast.error("Could not fetch employees");
    }
  };

  const fetchTasksDetails = async () => {
    try {
      const response = await getTaskDetails();
      if (response?.success) {
        setTasks(response.tasks || []);
      } else {
        toast.error(response?.message || "Failed to load tasks");
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      toast.error("Could not fetch tasks");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchTasksDetails();
  }, []);

  const employeeTasks = useMemo(() => {
    if (!employee?._id) return [];

    return tasks.filter(
      (task) => task.assignedTo === employee._id
    );
  }, [tasks, employee]);

  return (
    <div className="pb-10">
      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="text-center font-bold text-[#FFDAB3] text-xl uppercase"> Employee Details </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <EmployeeTaskListNo tasks={employeeTasks} />

      <div className="mt-5 bg-[#1B211A] p-4 rounded-2xl border border-[#FFDAB3]/30 shadow-sm mb-5">
        <div className="flex items-center justify-between gap-4 text-sm font-medium uppercase tracking-wide text-[#FFDAB3]">
          <div>
            <span className="text-[#F8F8F2]/70"> ID: </span>
            <span className="font-semibold">{loggedInUser?.id || "—"}</span>
          </div>
          <div>
            <span className="text-[#F8F8F2]/70"> Name: </span>
            <span className="font-semibold">{loggedInUser?.firstName || "—"} {loggedInUser?.lastName || "—"}</span>
          </div>
          <div>
            <span className="text-[#F8F8F2]/70"> Designation: </span>
            <span className="font-semibold">{loggedInUser?.designation || "Not assigned"}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Employee Profile Details </h1>
        <CustomTooltip id="employee-details-tooltip" message="You can update the employee details here." place="right" />
      </div>

      <div className="w-full flex justify-center">
        <form onClick={handleUpdateEmployee} className="w-full bg-[#1B211A] p-8 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8">

          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Update Employee Details </h2>
          </div>

          <div className="w-full md:w-[48%] flex flex-col gap-6">
            <div>
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> First Name </label>
              <input required name="firstName" value={formData.firstName} onChange={handleChange} className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
            </div>

            <div>
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Email </label>
              <input required name="email" value={formData.email} onChange={handleChange} className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
            </div>
          </div>

          <div className="w-full md:w-[48%] flex flex-col gap-6">
            <div>
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Last Name </label>
              <input required name="lastName" value={formData.lastName} onChange={handleChange} className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
            </div>

            <div>
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Designation </label>
              <input required name="designation" value={formData.designation} onChange={handleChange} className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-[50%] flex flex-col">
              <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80 flex justify-center"> Date Of Birth </label>
              <DatePicker selected={formData.dateOfBirth} onChange={handleDateChange} placeholderText="Select date of birth" dateFormat="dd/MM/yyyy" maxDate={new Date()} wrapperClassName="w-full" className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
            </div>
          </div>

          <div className="w-full flex flex-col items-center pt-2">
            <button type="submit" disabled={loading} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> {loading ? "Updating..." : "Update"} </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EmployeeProfileDetails;
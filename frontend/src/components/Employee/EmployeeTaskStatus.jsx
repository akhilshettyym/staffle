
import EmployeeTaskListNo from "./EmployeeTaskListNo";
import EmployeeTaskCard from "./EmployeeTaskCard";
import { useEffect, useState } from "react";
import { getTaskDetails } from "../../api/tasks";
import toast from "react-hot-toast";
import { getOrganizationUsers } from "../../api/employee";

const EmployeeTaskStatus = () => {

    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
            const response = await getOrganizationUsers();
            if (response?.success) {
                setEmployees(response.users || []);
            } else {
                toast.error(response?.message || "Failed to load employees");
            }
        } catch (error) {
            console.error("Failed to fetch employees:", error);
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
      fetchTasksDetails();
      fetchEmployees();
    }, []);

  return (
    <>
      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Task Status </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <EmployeeTaskListNo />

      <div className="mt-5 bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
        {tasks === 0 ? (
          <div className="text-center py-12 text-[#F8F8F2]/60 text-lg"> No tasks found at the moment. </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {tasks.map((task) => {
              return <EmployeeTaskCard key={task.id || task._id || Math.random()} task={task} />
            })}
          </div>
        )}
      </div>
    </>
  );

};

export default EmployeeTaskStatus;
import EmployeeTaskCard from "./EmployeeTaskCard";
import { useEffect } from "react";
import CustomTooltip from "../Basics/CustomTooltip";
import useEmployeeInProgressTask from "../../hooks/EmployeeHooks/useEmployeeInProgressTask";
import TaskListNo from "../Basics/TaskListNo";

const EmployeeInProgressTask = () => {

  const { fetchEmployees, fetchTasksDetails, employeeTasks, employeeInProgressTasks, handleTaskStatusChange } = useEmployeeInProgressTask();

  useEffect(() => {
    fetchTasksDetails();
    fetchEmployees();
  }, []);

  return (
    <div className="pb-10">

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> In Progress Tasks </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <TaskListNo tasks={employeeTasks} />

      <div className="flex items-center gap-2 mt-5">
        <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Tasks in progress </h1>
        <CustomTooltip id="in-progress-tooltip" message="Please provide a reasoning when updating a task status to Failed / mark as Completed." place="right" />
      </div>

      <div className="mt-5 bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
        {employeeInProgressTasks.length === 0 ? (
          <div className="text-center py-12 text-[#F8F8F2]/60 text-lg"> No tasks are accepted at the moment. </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {employeeInProgressTasks.map((task, index) => {
              return <EmployeeTaskCard key={task.id || task._id} index={index + 1} task={task} onTaskStatusChange={handleTaskStatusChange} />
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeInProgressTask;
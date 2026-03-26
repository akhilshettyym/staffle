import { useEffect } from "react";
import EmployeeTaskCard from "./EmployeeTaskCard";
import CustomTooltip from "../Basics/CustomTooltip";
import useEmployeeComFailedTasks from "../../hooks/EmployeeHooks/useEmployeeComFailedTasks";
import TaskListNo from "../Basics/TaskListNo";

const EmployeeComFailedTasks = () => {

    const { activeTab, setActiveTab, fetchTasksDetails, employeeTasks, employeeCompletedTasks, employeeFailedTasks } = useEmployeeComFailedTasks();

    useEffect(() => {
        fetchTasksDetails();
    }, []);

    return (
        <div className="pb-10">

            <hr className="my-5 border border-[#FFDAB3]/40" />

            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Completed / Failed Tasks </h1>

            <hr className="my-5 border border-[#FFDAB3]/40" />

            <TaskListNo tasks={employeeTasks} />

            <div className="flex gap-4 mb-8 mt-10">
                <button onClick={() => setActiveTab("completed-tasks")} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition 
                ${activeTab === "completed-tasks"
                        ? "bg-[#FFDAB3] text-[#1B211A]"
                        : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
                    }`}> Completed Tasks </button>

                <button onClick={() => setActiveTab("failed-tasks")} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition 
                ${activeTab === "failed-tasks"
                        ? "bg-[#FFDAB3] text-[#1B211A]"
                        : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
                    }`}> Failed Tasks </button>
            </div>

            {activeTab === "completed-tasks" && (
                <div>
                    <div className="flex items-center gap-2 mb-5">
                        <h1 className="text-lg uppercase text-[#FFDAB3] font-medium"> Completed Tasks </h1>
                        <CustomTooltip id="completed-tasks-tooltip" message="Review completed tasks and any associated feedback." place="right" />
                    </div>

                    <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
                        {employeeCompletedTasks.length === 0 ? (
                            <div className="text-center py-12 text-[#F8F8F2]/60 text-lg">
                                No tasks are completed.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {employeeCompletedTasks.map((task, index) => (
                                    <EmployeeTaskCard key={task.id || task._id} index={index + 1} task={task} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === "failed-tasks" && (
                <div>
                    <div className="flex items-center gap-2 mb-5">
                        <h1 className="text-lg uppercase text-[#FFDAB3] font-medium"> Failed Tasks </h1>
                        <CustomTooltip id="failed-tasks-tooltip" message="Review failed tasks and any associated feedback." place="right" />
                    </div>
                    <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">

                        {employeeFailedTasks.length === 0 ? (
                            <div className="text-center py-12 text-[#F8F8F2]/60 text-lg">
                                No tasks are failed.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {employeeFailedTasks.map((task, index) => (
                                    <EmployeeTaskCard key={task.id || task._id} index={index + 1} task={task} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default EmployeeComFailedTasks;
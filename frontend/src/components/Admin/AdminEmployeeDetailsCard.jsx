import { useEffect } from "react";
import { DateConversion, TaskCount, PriorityTag } from "../../constants/imports";
import CustomTooltip from "../Basics/CustomTooltip";
import useAdminEmployeeDetailsCard from "../../hooks/useAdminEmployeeDetailsCard";

const AdminEmployeeDetailsCard = () => {

    const { tasks, employees, fetchEmployees, fetchTasksDetails } = useAdminEmployeeDetailsCard();

    useEffect(() => {
        fetchEmployees();
        fetchTasksDetails();
    }, []);

    return (
        <div className="pb-10">

            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex justify-center"> Employee Details </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <div className="flex items-center gap-2">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Employees / assigned tasks</h1>
                <CustomTooltip id="employee-details-tooltip" message="View employee profiles and their assigned tasks." place="right" />

                <h1 className="flex items-center text-xs uppercase text-[#FFDAB3] font-medium ml-5">
                    <span className="truncate">Total number of employees : </span>
                    <span className="flex items-center justify-center h-5 w-5 ml-2 rounded-full bg-[#FFDAB3] text-black text-[12px] font-bold shrink-0"> {employees.length} </span>
                </h1>

            </div>

            {employees.length === 0 ? (
                <div className="bg-[#1B211A] rounded-2xl p-10 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                    <p className="text-center text-[#F8F8F2]/60">No Employees added.</p>
                </div>
            ) : (

                employees.map((emp, index) => {

                    const employeeTasks = tasks.filter((task) => (task.assignedTo === emp._id || task.assignedTo === emp.id));

                    const taskCounts = {
                        NEW: 0,
                        IN_PROGRESS: 0,
                        COMPLETED: 0,
                        FAILED: 0
                    };

                    employeeTasks.forEach((t) => {
                        const status = t?.status?.toUpperCase();

                        if (taskCounts[status] !== undefined) {
                            taskCounts[status]++;
                        }
                    });

                    return (

                        <div key={emp._id || emp.id}>
                            <div className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner transition-all duration-300 ease-in-out hover:border-[#FFDAB3]/70 hover:shadow-md hover:-translate-y-1">

                                <div className="bg-[#2C3930]/40 py-3 px-5 flex items-center rounded-2xl mb-3 hidden md:flex">

                                    <h2 className="min-w-[140px] w-1/6 text-[#A7C1A8] text-xl font-bold"> {emp.firstName} {emp.lastName} </h2>

                                    <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center"> New Tasks :
                                        <TaskCount taskCount={taskCounts.NEW ?? 0} />
                                    </h2>

                                    <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center"> In-progress Tasks :
                                        <TaskCount taskCount={taskCounts.IN_PROGRESS ?? 0} />
                                    </h2>


                                    <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center"> Completed Tasks :
                                        <TaskCount taskCount={taskCounts.COMPLETED ?? 0} />
                                    </h2>

                                    <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center"> Failed Tasks :
                                        <TaskCount taskCount={taskCounts.FAILED ?? 0} />
                                    </h2>

                                    <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center"> Total Tasks :
                                        <TaskCount taskCount={employeeTasks.length} />
                                    </h2>

                                </div>

                                <hr className="my-4 border border-[#FFDAB3]/30" />

                                <div className="bg-[#FFDAB3]/20 py-3 px-5 flex items-center rounded-2xl mb-3 border border-[#FFDAB3]/10 hidden md:flex">
                                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Title </span>
                                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Category </span>
                                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Status </span>
                                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Created </span>
                                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Due Date </span>
                                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase text-center"> Priority  </span>
                                </div>

                                <div className="space-y-3">

                                    {employeeTasks.map((task) => (

                                        <div key={task._id || task.id} className="bg-[#0F1412] py-3 px-4 md:px-5 flex flex-col md:flex-row md:items-center rounded-2xl border border-[#FFDAB3]/20 gap-3 md:gap-0">

                                            <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                                <span className="md:hidden font-semibold"> Title : </span> {task.title}
                                            </div>

                                            <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                                <span className="md:hidden font-semibold"> Category : </span> {task.category}
                                            </div>

                                            <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                                <span className="md:hidden font-semibold"> Status : </span> {task.status}
                                            </div>

                                            <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                                <span className="md:hidden font-semibold"> Created : </span>
                                                <DateConversion convertDate={task?.createdAt} />
                                            </div>

                                            <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                                <span className="md:hidden font-semibold"> Due Date : </span>
                                                <DateConversion convertDate={task?.dueDate} />
                                            </div>

                                            <div className="md:w-1/6 flex justify-center">
                                                <PriorityTag priorityMsg={task.priority} />
                                            </div>

                                        </div>
                                    ))}
                                </div>

                                {employeeTasks.length === 0 && (
                                    <p className="text-center text-[#F8F8F2]/50 py-4">
                                        No tasks assigned yet.
                                    </p>
                                )}
                            </div>

                            {index < employees.length - 1 && (
                                <hr className="my-5 border border-[#FFDAB3]/40" />
                            )}

                        </div>
                    );
                })
            )}
        </div>
    );
};

export default AdminEmployeeDetailsCard;
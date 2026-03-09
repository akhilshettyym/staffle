import { useContext, AuthContext, DateConversion, TaskCount, PriorityTag } from "../constants/imports";

const AdminEmployeeDetailsCard = () => {

    const authData = useContext(AuthContext);
    const employees = authData?.employees ?? [];

    return (
        <div className="pb-10">
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Employee Details </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            {employees.length === 0 ? (
                <div className="bg-[#1B211A] rounded-2xl p-10 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                    <p className="text-center text-[#F8F8F2]/60"> No Employees added. </p>
                </div>
            ) : (
                employees.map((emp) => (
                    <div key={emp._id || emp.id}>
                        <div className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                            <div className="bg-[#2C3930]/50 py-3 px-5 flex items-center rounded-2xl mb-3 border border-[#EEEFE0]/50 flex-wrap gap-3">
                                <h2 className="min-w-[140px] text-[#A7C1A8] text-xl font-bold">
                                    {emp.firstName} {emp.lastName}
                                </h2>

                                <h2 className="text-[#FFDAB3] text-sm font-medium flex items-center gap-2">
                                    In-progress Tasks: <TaskCount taskCount={emp.taskNumbers?.active ?? 0} />
                                </h2>

                                <h2 className="text-[#FFDAB3] text-sm font-medium flex items-center gap-2">
                                    New Tasks: <TaskCount taskCount={emp.taskNumbers?.newTask ?? 0} />
                                </h2>

                                <h2 className="text-[#FFDAB3] text-sm font-medium flex items-center gap-2">
                                    Completed Tasks: <TaskCount taskCount={emp.taskNumbers?.completed ?? 0} />
                                </h2>

                                <h2 className="text-[#FFDAB3] text-sm font-medium flex items-center gap-2">
                                    Failed Tasks: <TaskCount taskCount={emp.taskNumbers?.failed ?? 0} />
                                </h2>
                                
                                <h2 className="text-[#FFDAB3] text-sm font-medium flex items-center gap-2">
                                    Total Tasks: <TaskCount taskCount={emp.tasks?.length ?? 0} />
                                </h2>
                            </div>

                            <hr className="my-4 border border-[#FFDAB3]/30" />

                            <div className="bg-[#FFDAB3]/20 py-3 px-5 flex items-center rounded-2xl mb-3 border border-[#FFDAB3]/10 hidden md:flex">
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Title </span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Category </span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Status </span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Created </span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase"> Due </span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase text-center"> Priority </span>
                            </div>

                            <div className="space-y-3">
                                {emp.tasks?.map((task) => (
                                    <div key={task._id || task.id} className="bg-[#0F1412] py-3 px-4 md:px-5 flex flex-col md:flex-row md:items-center rounded-2xl border border-[#FFDAB3]/20 gap-3 md:gap-0">

                                        <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                            <span className="md:hidden font-semibold"> Title: </span> {task.title}
                                        </div>

                                        <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                            <span className="md:hidden font-semibold"> Category: </span> {task.category}
                                        </div>

                                        <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                            <span className="md:hidden font-semibold"> Status: </span> {task.status}
                                        </div>

                                        <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                            <span className="md:hidden font-semibold"> Created: </span>
                                            <DateConversion convertDate={task?.createdAt} />
                                        </div>

                                        <div className="md:w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                            <span className="md:hidden font-semibold"> Due: </span>
                                            <DateConversion convertDate={task?.dueDate} />
                                        </div>

                                        <div className="md:w-1/6 flex justify-center md:justify-center">
                                            <PriorityTag priorityMsg={task.priority} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {emp.tasks?.length === 0 && (
                                <p className="text-center text-[#F8F8F2]/50 py-6"> No tasks assigned yet. </p>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminEmployeeDetailsCard;
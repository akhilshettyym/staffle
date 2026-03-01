import { useContext, AuthContext, Header, AdminControl, DateConversion, TaskCount, PriorityTag } from "../../../constants/imports";

const EmployeeAdDetails = ({ data, handleLogout, orgData }) => {

    const authData = useContext(AuthContext);
    const employees = authData?.employees ?? [];

    return (
        <div className="h-screen w-full p-10">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <AdminControl />
            <div className="pb-10">

                <hr className="my-5 border border-[#FFDAB3]/40" />
                <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Employee Details </h1>
                <hr className="my-5 border border-[#FFDAB3]/40" />

                {employees.map((emp) => (
                    <div key={emp.id}>

                        <div className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                            <div className="bg-[#2C3930]/50 py-3 px-5 flex items-center rounded-2xl mb-3 border border-[#EEEFE0]/50">
                                <h2 className="w-1/6 text-[#A7C1A8] text-xl font-bold">
                                    {emp.firstName} {emp.lastName}
                                </h2>

                                <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center gap-2"> In-progress Tasks:
                                    <TaskCount taskCount={emp.taskNumbers?.active ?? 0} />
                                </h2>

                                <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center gap-2"> New Tasks:
                                    <TaskCount taskCount={emp.taskNumbers?.newTask ?? 0} />
                                </h2>

                                <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center gap-2"> Completed Tasks:
                                    <TaskCount taskCount={emp.taskNumbers?.completed ?? 0} />
                                </h2>

                                <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center gap-2"> Failed Tasks:
                                    <TaskCount taskCount={emp.taskNumbers?.failed ?? 0} />
                                </h2>

                                <h2 className="w-1/6 text-[#FFDAB3] text-sm font-medium flex items-center gap-2"> Total Tasks:
                                    <TaskCount taskCount={emp.tasks?.length ?? 0} />
                                </h2>
                            </div>

                            <hr className="my-2 border border-[#FFDAB3]/40" />

                            <div className="bg-[#FFDAB3]/20 py-3 px-5 flex items-center rounded-2xl mb-3 border border-[#FFDAB3]/10">
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Title</span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Category</span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Status</span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Created</span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Due</span>
                                <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase text-center">Priority</span>
                            </div>

                            {emp.tasks.map((task) => {
                                return (
                                    <div key={task.id} className="bg-[#0F1412] py-3 px-5 flex items-center rounded-2xl mb-3 border border-[#FFDAB3]/20">
                                        <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">{task.title}</span>
                                        <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">{task.category}</span>
                                        <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">{task.status}</span>
                                        <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize"><DateConversion convertDate={task?.createdAt} /></span>
                                        <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize"><DateConversion convertDate={task?.dueDate} /></span>
                                        <div className="w-1/6 flex justify-center">
                                            <PriorityTag priorityMsg={task.priority} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeAdDetails;
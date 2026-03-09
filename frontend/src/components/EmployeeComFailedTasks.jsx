import EmployeeTaskListNo from "./EmployeeTaskListNo";
import EmployeeTaskCard from "./EmployeeTaskCard";


const EmployeeComFailedTasks = ({ data }) => {

    const completedTasks = data?.tasks?.filter((task) => task.status === "completed") ?? [];
    const failedTasks = data?.tasks?.filter((task) => task.status === "failed") ?? [];

    return (
        <>
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase text-center"> Completed / Failed Tasks </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <EmployeeTaskListNo />

            <div className="space-y-12 mt-5">

                <section className="w-full">
                    <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
                        {completedTasks.length === 0 ? (
                            <div className="text-center py-12 text-[#F8F8F2]/60 text-lg"> No completed tasks. </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {completedTasks.map((task) => (
                                    <EmployeeTaskCard key={task.id || task._id} task={task} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>


                <section className="w-full">
                    <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
                        {failedTasks.length === 0 ? (
                            <div className="text-center py-12 text-[#F8F8F2]/60 text-lg"> No failed tasks. </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {failedTasks.map((task) => (
                                    <EmployeeTaskCard key={task.id || task._id} task={task} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </>
    );
};

export default EmployeeComFailedTasks;
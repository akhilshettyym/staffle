const TaskListNo = ({ tasks }) => {

    const taskCounts = tasks.reduce(
        (acc, task) => {
            if (task?.status === "NEW") acc.NEW += 1;
            else if (task?.status === "IN_PROGRESS") acc.IN_PROGRESS += 1;
            else if (task?.status === "FAILED") acc.FAILED += 1;
            else if (task?.status === "COMPLETED") acc.COMPLETED += 1;
            else if (task?.status === "REJECTION_REQUESTED") acc.REJECTION_REQUESTED += 1;

            return acc;
        },
        {
            NEW: 0,
            IN_PROGRESS: 0,
            FAILED: 0,
            COMPLETED: 0,
            REJECTION_REQUESTED: 0
        }
    );

    return (
        <div className="flex flex-wrap mt-5 gap-6">
            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-3 shadow-md">
                <h2 className="text-3xl font-semibold text-[#FFDAB3]">{taskCounts?.NEW || "0"}</h2>
                <h3 className="mt-1 text-lg text-[#F8F8F2]/80"> New Tasks </h3>
            </div>

            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-3 shadow-md">
                <h2 className="text-3xl font-semibold text-[#FFDAB3]">{taskCounts?.IN_PROGRESS || "0"}</h2>
                <h3 className="mt-1 text-lg text-[#F8F8F2]/80"> In Progress </h3>
            </div>

            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-3 shadow-md">
                <h2 className="text-3xl font-semibold text-[#FFDAB3]">{taskCounts?.COMPLETED || "0"}</h2>
                <h3 className="mt-1 text-lg text-[#F8F8F2]/80"> Completed </h3>
            </div>

            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-3 shadow-md">
                <h2 className="text-3xl font-semibold text-[#FFDAB3]">{taskCounts?.FAILED || "0"}</h2>
                <h3 className="mt-1 text-lg text-[#F8F8F2]/80"> Failed </h3>
            </div>

            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-3 shadow-md">
                <h2 className="text-3xl font-semibold text-[#FFDAB3]">{taskCounts?.REJECTION_REQUESTED || "0"}</h2>
                <h3 className="mt-1 text-lg text-[#F8F8F2]/80"> Rejection Requested</h3>
            </div>
        </div>
    )
}

export default TaskListNo;
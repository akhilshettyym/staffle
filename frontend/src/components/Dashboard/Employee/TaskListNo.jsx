const TaskListNo = ({ data }) => {
    return (
        <div className="flex flex-wrap mt-5 gap-6">
            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-3 shadow-md">
                <h2 className="text-3xl font-semibold text-[#FFDAB3]">{data.taskNumbers.newTask ?? 0}</h2>
                <h3 className="mt-1 text-lg text-[#F8F8F2]/80">New Tasks</h3>
            </div>

            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-3 shadow-md">
                <h2 className="text-3xl font-semibold text-[#FFDAB3]">{data.taskNumbers.active ?? 0}</h2>
                <h3 className="mt-1 text-lg text-[#F8F8F2]/80">In Progress</h3>
            </div>

            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-3 shadow-md">
                <h2 className="text-3xl font-semibold text-[#FFDAB3]">{data.taskNumbers.completed ?? 0}</h2>
                <h3 className="mt-1 text-lg text-[#F8F8F2]/80">Completed</h3>
            </div>

            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-3 shadow-md">
                <h2 className="text-3xl font-semibold text-[#FFDAB3]">{data.taskNumbers.failed ?? 0}</h2>
                <h3 className="mt-1 text-lg text-[#F8F8F2]/80">Failed</h3>
            </div>
        </div>
    )
}

export default TaskListNo;
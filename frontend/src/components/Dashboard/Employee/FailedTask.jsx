import { TaskCard } from "../../../constants/imports";

const FailedTask = ({ data }) => {
  const failedTask = data?.tasks?.filter((e) => e.status === "failed") || [];
  return (
    <section className="w-full">
      <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
        {failedTask.length === 0 ? (
          <div className="text-center py-12 text-[#F8F8F2]/60 text-lg"> No failed tasks. </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {failedTask.map((task) => (
              <TaskCard key={task.id || task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default FailedTask;
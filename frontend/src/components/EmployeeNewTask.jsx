
import EmployeeTaskListNo from "./EmployeeTaskListNo";
import EmployeeTaskCard from "./EmployeeTaskCard";

const EmployeeNewTask = ({ data }) => {

  const newTasks = data?.tasks?.filter((e) => e.status === "new") || [];

  return (
    <>
      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> New Tasks </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <EmployeeTaskListNo />

      <div className="mt-5 bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
        {newTasks.length === 0 ? (
          <div className="text-center py-12 text-[#F8F8F2]/60 text-lg"> No new tasks at the moment. </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {newTasks.map((task) => {
              return <EmployeeTaskCard key={task.id || task._id} task={task} />
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeNewTask;
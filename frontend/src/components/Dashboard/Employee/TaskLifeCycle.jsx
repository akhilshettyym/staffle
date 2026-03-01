import { Header, CompletedTask, EmployeeControl, FailedTask, TaskListNo } from "../../../constants/imports";

const TaskLifeCycle = ({ data, handleLogout, orgData }) => {

    return (
        <div className="h-screen w-full p-10 overflow-auto">
            <Header data={data} handleLogout={handleLogout} orgData={orgData} />
            <EmployeeControl />
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase text-center"> Completed / Failed Tasks </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <TaskListNo data={data} />
            <div className="space-y-12 mt-5">
                <CompletedTask data={data} />
                <FailedTask data={data} />
            </div>
        </div>
    );
};
export default TaskLifeCycle;
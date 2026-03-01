import { useState, useContext, toast, getLocalStorage, setLocalStorage, AuthContext, ConfirmModal } from "../../constants/imports";

const RemoveTask = ({ taskId }) => {
    const { updateAuthData } = useContext(AuthContext);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteTask = () => {
        const taskbridge = getLocalStorage() || { admin: {}, employees: [] };

        if (!taskbridge.admin || !taskbridge.employees) {
            toast.error("Invalid data structure");
            return;
        }

        let taskFound = false;
        let affectedEmployee = null;

        const updatedAdminTasks = (taskbridge.admin.tasks || []).filter(task => {
            if (task.id === taskId) {
                taskFound = true;
                return false;
            }
            return true;
        });

        const updatedEmployees = taskbridge.employees.map((emp) => {
            if (!emp.tasks) return emp;

            const updatedTasks = emp.tasks.filter((task) => {
                if (task.id === taskId) {
                    taskFound = true;
                    affectedEmployee = emp;
                    return false;
                }
                return true;
            });

            if (taskFound && affectedEmployee?.id === emp.id) {
                const newTaskCount = updatedTasks.filter(t => t.status === "new").length;
                const activeCount = updatedTasks.filter(t => t.status === "active").length;
                const completedCount = updatedTasks.filter(t => t.status === "completed").length;
                const failedCount = updatedTasks.filter(t => t.status === "failed").length;

                return {
                    ...emp,
                    tasks: updatedTasks,
                    taskNumbers: {
                        ...emp.taskNumbers,
                        newTask: newTaskCount,
                        active: activeCount,
                        completed: completedCount,
                        failed: failedCount,
                    },
                };
            }

            return emp;
        });

        if (!taskFound) {
            toast.error("Task not found");
            return;
        }

        const updatedTaskbridge = {
            ...taskbridge,
            admin: {
                ...taskbridge.admin,
                tasks: updatedAdminTasks,
            },
            employees: updatedEmployees,
        };

        setLocalStorage(updatedTaskbridge);
        updateAuthData(updatedTaskbridge);

        toast.success("Task removed successfully");
        setShowConfirm(false);
    };

    return (
        <>
            <button onClick={() => setShowConfirm(true)} className="py-1 px-4 text-sm rounded-md bg-red-500 border font-semibold border-red-600 text-[#FFDAB3] hover:bg-red-600 transition"> Delete </button>

            <ConfirmModal isOpen={showConfirm} title="Delete Task" message="Are you sure you want to delete this task? This action cannot be undone." onCancel={() => setShowConfirm(false)} onConfirm={handleDeleteTask} btnTitle={"Delete"} />
        </>
    );
};

export default RemoveTask;
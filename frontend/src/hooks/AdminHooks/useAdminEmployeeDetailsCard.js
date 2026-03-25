import useTasksDetails from "../../utils/useTasksDetails";
import useEmployeesDetails from "../../utils/useEmployeesDetails";

const useAdminEmployeeDetailsCard = () => {

    const { tasks, fetchTasksDetails } = useTasksDetails();
    const { employees, fetchEmployees } = useEmployeesDetails();

    const activeEmployees = employees.filter((emp) => emp.employmentStatus === "ACTIVE" || "");

    return { tasks, employees, activeEmployees, fetchEmployees, fetchTasksDetails };
}

export default useAdminEmployeeDetailsCard;
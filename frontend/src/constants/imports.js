import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import { Eye, EyeOff } from "lucide-react";
import { BiSolidError } from "react-icons/bi";
import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation, Navigate, Route, Routes } from "react-router-dom";
import { MdOutlineAdminPanelSettings as AdminOutline } from "react-icons/md";
import { FiGrid, FiClipboard, FiUsers, FiBarChart2, FiBarChart } from "react-icons/fi";

import { AuthContext } from "../context/AuthProvider";

import Landing from "../components/Auth/Landing";

import Header from "../components/Basics/Header";
import RemoveEmp from "../components/Admin/AdminDeactivateEmployee";
import TaskCount from "../components/Basics/TaskCount";
import RemoveTask from "../components/Admin/AdminRemoveTask";
import PriorityTag from "../components/Basics/PriorityTag";
import ConfirmModal from "../components/Basics/ConfirmModal";
import DateConversion from "../components/Basics/DateConversion";
import PasswordToggle from "../components/Basics/PasswordToggle";
import EditEmployeeDets from "../components/Admin/AdminUpdateEmployeeDetails";

// import Dashboard from "../components/AdminDashBoard";
import CreateTask from "../components/Admin/AdminCreateTaskForm"
import TaskStatus from "../components/Admin/AdminTaskStatusTable";
import AdminDetails from "../components/Admin/AdminProfileDetails";
import CreatedTasks from "../components/Admin/AdminTasksTable";
import AdminControl from "../components/Admin/AdminControlPanel";
import EmployeeAdDetails from "../components/Admin/AdminEmployeeDetailsCard";
import EmployeeManagement from "../components/Admin/AdminEmployeeManager";


import EmpTaskStatus from "../components/Employee/EmployeeTaskStatus";
import TaskLifeCycle from "../components/Employee/EmployeeComFailedTasks";
import EmployeeEmpDetails from "../components/Employee/EmployeeProfileDetails";

import { getLocalStorage, setLocalStorage, generateSequentialId, getOrganizationData } from "../utils/localStorage";

export {
    useRef, useState, useEffect, useContext,

    Landing, Toaster, toast,

    Link, useNavigate, useLocation, Navigate, Route, Routes,

    Eye, EyeOff, FiGrid, FiClipboard, FiUsers, FiBarChart2, FiBarChart, BiSolidError, DatePicker, uuidv4, AdminOutline,

    getLocalStorage, setLocalStorage, generateSequentialId, getOrganizationData, AuthContext,
    Header, RemoveEmp, TaskCount, RemoveTask, PriorityTag, ConfirmModal, DateConversion, PasswordToggle, EditEmployeeDets, CreateTask, TaskStatus, AdminDetails, CreatedTasks, AdminControl, EmployeeAdDetails, EmployeeManagement, EmpTaskStatus, TaskLifeCycle, EmployeeEmpDetails,
}
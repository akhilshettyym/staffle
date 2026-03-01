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

import Landing from "../components/Landing";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import RegisterOrg from "../components/Auth/RegisterOrg";

import Header from "../components/Basics/Header";
import RemoveEmp from "../components/Basics/RemoveEmp";
import TaskCount from "../components/Basics/TaskCount";
import RemoveTask from "../components/Basics/RemoveTask";
import PriorityTag from "../components/Basics/PriorityTag";
import ConfirmModal from "../components/Basics/ConfirmModal";
import DateConversion from "../components/Basics/DateConversion";
import PasswordToggle from "../components/Basics/PasswordToggle";
import EditEmployeeDets from "../components/Basics/EditEmployeeDets";

import Dashboard from "../components/Dashboard/Admin/Dashboard";
import CreateTask from "../components/Dashboard/Admin/Createtask"
import TaskStatus from "../components/Dashboard/Admin/TaskStatus";
import AddEmployees from "../components/Dashboard/Admin/AddEmployees";
import AdminDetails from "../components/Dashboard/Admin/AdminDetails";
import CreatedTasks from "../components/Dashboard/Admin/CreatedTasks";
import AdminControl from "../components/Dashboard/Admin/AdminControl";
import EditTaskModal from "../components/Dashboard/Admin/EditTaskModal";
import EmployeeAdDetails from "../components/Dashboard/Admin/EmployeeAdDetails";
import EmployeeManagement from "../components/Dashboard/Admin/EmployeeManagement";

import NewTask from "../components/Dashboard/Employee/NewTask";
import TaskCard from "../components/Dashboard/Employee/TaskCard";
import FailedTask from "../components/Dashboard/Employee/FailedTask";
import InProgress from "../components/Dashboard/Employee/InProgress";
import TaskListNo from "../components/Dashboard/Employee/TaskListNo";
import EmpTaskStatus from "../components/Dashboard/Employee/EmpTaskStatus";
import TaskLifeCycle from "../components/Dashboard/Employee/TaskLifeCycle";
import CompletedTask from "../components/Dashboard/Employee/CompletedTask";
import EmployeeControl from "../components/Dashboard/Employee/EmployeeControl";
import FailedTaskModal from "../components/Dashboard/Employee/FailedTaskModal";
import EmployeeEmpDetails from "../components/Dashboard/Employee/EmployeeEmpDetails";

import { getLocalStorage, setLocalStorage, generateSequentialId, getOrganizationData } from "../utils/localStorage";

export {
    useRef, useState, useEffect, useContext,

    Landing, SignIn, SignUp, RegisterOrg, Toaster, toast,
    
    Link, useNavigate, useLocation, Navigate, Route, Routes,

    Eye, EyeOff, FiGrid, FiClipboard, FiUsers, FiBarChart2, FiBarChart, BiSolidError, DatePicker, uuidv4, AdminOutline, 

    getLocalStorage, setLocalStorage, generateSequentialId, getOrganizationData, AuthContext,
    Header, RemoveEmp,  TaskCount, RemoveTask, PriorityTag, ConfirmModal, DateConversion, PasswordToggle, EditEmployeeDets, 
    Dashboard, CreateTask, TaskStatus, AddEmployees, AdminDetails, CreatedTasks, AdminControl, EditTaskModal, EmployeeAdDetails, EmployeeManagement, 
    NewTask, TaskCard, FailedTask, InProgress, TaskListNo, EmpTaskStatus, TaskLifeCycle, CompletedTask, EmployeeControl, FailedTaskModal, EmployeeEmpDetails,
}
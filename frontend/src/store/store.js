import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import taskReducer from "../slices/taskSlice";
import organizationReducer from "../slices/organizationSlice";
import superAdminReducer from "../slices/superAdminOrgSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
        organization: organizationReducer,
        superadmin: superAdminReducer,
    },
});
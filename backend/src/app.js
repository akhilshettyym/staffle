import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

/* - routes */
import authRouter from "./routes/auth.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import taskRoutes from "./routes/task.routes.js";
import organizationRoutes from "./routes/organization.routes.js";

/* * - use routes */
app.use("/api/auth", authRouter);
app.use("/api/org", organizationRoutes);
app.use("/api/employee", employeeRouter);
app.use("/api/tasks", taskRoutes);


export default app;
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

/* routes */
import authRouter from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import adminRoute from "./routes/admin.routes.js";
import organizationRoutes from "./routes/organization.routes.js";

/* use routes */
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/org", organizationRoutes);
app.use("/api/employee", employeeRouter);


export default app;
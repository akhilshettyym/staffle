import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
            process.env.CLIENT_URL
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

app.use(express.json());
app.use(cookieParser());

/* routes */
import authRouter from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import adminRoute from "./routes/admin.routes.js";
import organizationRoutes from "./routes/organization.routes.js";

import superadminRoutes from "./routes/superadmin.routes.js";

/* use routes */
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/organization", organizationRoutes);
app.use("/api/employee", employeeRouter);

app.use("/api/superadmin/control", superadminRoutes);


export default app;
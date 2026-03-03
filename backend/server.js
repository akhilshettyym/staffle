import 'dotenv/config';
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { createSuperAdmin } from "./src/utils/createSuperAdmin.js";

connectDB();
await createSuperAdmin();

app.listen(process.env.PORT, () => {
    console.log(`Server running at the port ${process.env.PORT}`);
})
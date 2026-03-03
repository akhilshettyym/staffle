import { ROLE_PERMISSIONS } from "../constants/rolePermissions.js";
import userModel from "../models/user.model.js";

export const createSuperAdmin = async () => {
    try {
        const email = process.env.SUPER_ADMIN_EMAIL.toLowerCase();
        const passwordFromEnv = process.env.SUPER_ADMIN_PASSWORD;

        if (!email || !passwordFromEnv) {
            console.log("SUPER_ADMIN credentials missing");
            return;
        }

        const existingSuperAdmin = await userModel.findOne({ role: "SUPER_ADMIN" });

        if (!existingSuperAdmin) {
            await userModel.create({
                firstName: "Akhil",
                lastName: "Shetty",
                email,
                password: passwordFromEnv,
                role: "SUPER_ADMIN",
                dateOfBirth: new Date("2003-03-29"),
                designation: "Platform Owner",
                organizationId: null,
                permissions: ROLE_PERMISSIONS["SUPER_ADMIN"] || []
            });

            console.log("Super Admin created");
        } else {
            existingSuperAdmin.email = email;
            existingSuperAdmin.password = passwordFromEnv;
            await existingSuperAdmin.save();

            console.log("Super Admin updated");
        }

    } catch (error) {
        console.error("Error creating/updating super admin:", error);
    }
};
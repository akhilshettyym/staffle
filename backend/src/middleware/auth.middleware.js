// import jwt from "jsonwebtoken";
// import userModel from "../models/user.model.js";

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Not authorized",
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded.userId);

//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         req.user = user;
//         next();

//     } catch (err) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid or expired token",
//         });
//     }
// };

// export default authMiddleware;



import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { ROLE_PERMISSIONS } from "../constants/permissions.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // Attach permissions based on role
        const permissions = ROLE_PERMISSIONS[user.role] || [];

        req.user = {
            ...user.toObject(),
            permissions
        };

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;
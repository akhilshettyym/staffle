export const requirePermission = (permission) => {
    return (req, res, next) => {
        if (!req.user || !Array.isArray(req.user.permissions)) {
            return res.status(403).json({
                success: false,
                message: "Permissions not properly configured"
            });
        }

        if (!req.user.permissions.includes(permission)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action"
            });
        }

        next();
    };
};
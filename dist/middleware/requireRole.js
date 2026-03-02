export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.session.role) {
            return res.status(400).json({ error: "Unauthorized" });
        }
        if (!allowedRoles.includes(req.session.role)) {
            return res.status(403).json({ error: "Forbidden: Insufficient role" });
        }
        next();
    };
};
//# sourceMappingURL=requireRole.js.map
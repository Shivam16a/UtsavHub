// Check if user logged in
exports.isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    next();
};

// Simple admin middleware
exports.isAdmin = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.status(403).json({ message: "unauthorised" });
    }
    next();
};

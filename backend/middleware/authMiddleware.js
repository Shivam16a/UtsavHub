const User = require('../models/users.js');

// Check if user logged in and attach user object
exports.isAuthenticated = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // attach user object
    next();
  } catch (error) {
    res.status(500).json({ message: 'Authentication error' });
    console.log(error);
  }
};

// Admin middleware (optional)
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
};

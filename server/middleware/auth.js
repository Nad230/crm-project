// Middleware to verify admin token
const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token
  if (!token) return res.status(403).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.adminId = decoded.adminId; // Store admin ID in request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyAdminToken;

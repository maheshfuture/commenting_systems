const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = { userId: decoded.userId };
    next();
  });
};

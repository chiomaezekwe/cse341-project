// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Make sure the path is correct

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Keep this in .env

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader); // <-- log

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded JWT:', decoded); // <-- log
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err); // <-- log
    return res.status(401).json({ message: 'Invalid or expired token' });
    console.log('Auth middleware: token', token);
  }
};


module.exports = auth;


const jwt = require('jsonwebtoken'); // Import the jsonwebtoken package

// Authentication middleware to check if the user has a valid JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Token from 'Authorization' header
  
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Use your secret key
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    req.user = user; // Add user data to request for later use
    console.log("jwtAuth req.user: ", req.user)
    next(); // Proceed to the next middleware or route handler
  });
};

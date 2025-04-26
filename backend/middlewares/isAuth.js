require("dotenv").config(); // Load environment variables from .env
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  // Get the token from the Authorization header
  const headerObj = req.headers;

  // Check if the 'authorization' header exists and is properly formatted
  if (
    !headerObj.authorization ||
    !headerObj.authorization.startsWith("Bearer ")
  ) {
    const err = new Error("Authorization token is missing or malformed");
    err.status = 401; // Unauthorized status code
    return next(err); // Pass the error to the next middleware
  }

  // Extract token from the Authorization header
  const token = headerObj.authorization.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // Save the user ID from the decoded token into req.user
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle errors related to token verification (e.g., invalid token or expired)
    const error = new Error("Token expired or invalid, please login again");
    error.status = 401;
    next(error); // Pass the error to the next middleware
  }
};

module.exports = isAuthenticated;

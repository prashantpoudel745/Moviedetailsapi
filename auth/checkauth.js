import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const checkAuthentication = (req, res, next) => {
  const token = req.cookies.token; // Get token from the Authorization header
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the token using the secret key
    req.user = { ...decoded, id: decoded.id }; // Store user info including id from the token
    next(); // Pass to the next middleware/route handler
    console.log(decoded.id);
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default checkAuthentication;

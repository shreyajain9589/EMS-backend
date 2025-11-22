import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Employee from "../models/Employee.js";

// --------------------------------------------------
// PROTECT ROUTES (Require Login)
// Reads JWT from Authorization header: "Bearer token"
// --------------------------------------------------
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try to find user in User collection (admin / manager / initial admin)
      let currentUser = await User.findById(decoded.id).select("-password");

      // If not found, check Employee collection
      if (!currentUser) {
        currentUser = await Employee.findById(decoded.id).select("-password");
      }

      if (!currentUser) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = currentUser;
      return next();

    } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

// --------------------------------------------------
// ROLE-BASED AUTHORIZATION
// Example: authorize("admin", "manager")
// --------------------------------------------------
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

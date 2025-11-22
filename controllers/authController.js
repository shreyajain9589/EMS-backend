import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Employee from "../models/Employee.js";   // 👈 added

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ---------------------------------------------
// REGISTER (Admin or first user automatically admin)
// ---------------------------------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    // First user of the system automatically becomes admin
    const userCount = await User.countDocuments();
    let assignedRole = role || "employee";
    if (userCount === 0) assignedRole = "admin";

    // Create user
    const user = await User.create({
      name,
      email,
      password, // pre-save middleware will hash it
      role: assignedRole,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ---------------------------------------------
// LOGIN  🔥 UPDATED
// ---------------------------------------------
export const loginUser = async (req, res) => {
  console.log("LOGIN HIT:", req.body);

  const { email, password } = req.body;

  try {
    // First try USER collection (Admins)
    let user = await User.findOne({ email });

    // If not found, try EMPLOYEE collection
    if (!user) {
      user = await Employee.findOne({ email });
    }

    // Validate password via matchPassword()
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "employee",   // default employee role
        token: generateToken(user),
      });
    }

    return res.status(401).json({ message: "Invalid email or password" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ---------------------------------------------
// GET PROFILE (Logged-in user only)
// ---------------------------------------------
export const getMe = async (req, res) => {
  return res.json(req.user);
};

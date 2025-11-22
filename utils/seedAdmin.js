import 'dotenv/config';
import mongoose from "mongoose";
import User from "../models/User.js";
import connectDB from "../config/db.js";

const createAdmin = async () => {
  await connectDB();

  // delete old admin if exists
  await User.deleteMany({ email: "admin@local" });

  // create admin with plain password (pre-save hook will hash it ONCE)
  const user = new User({
    name: "Admin",
    email: "admin@local",
    password: "admin123",   // plain text → will be hashed ONCE by pre-save
    role: "admin",
  });

  await user.save();

  console.log("Admin created successfully!");
  console.log("Email: admin@local");
  console.log("Password: admin123");

  process.exit();
};

createAdmin();

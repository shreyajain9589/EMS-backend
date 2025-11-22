console.log("AUTH ROUTES LOADED SUCCESSFULLY");

import express from "express";
import {
  registerUser,
  loginUser,
  getMe
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// PRIVATE ROUTE (GET LOGGED-IN USER PROFILE)
router.get("/me", protect, getMe);

export default router;

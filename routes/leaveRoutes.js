import express from "express";
import {
  createLeave,
  getLeaves,
  getUserLeaves,
  approveLeave,
  rejectLeave,
} from "../controllers/leaveController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// APPLY FOR LEAVE (Employee, Manager, Admin)
router.post(
  "/",
  protect,
  authorize("employee", "manager", "admin"),
  createLeave
);

// GET ALL LEAVES (Admin / Manager only)
router.get(
  "/",
  protect,
  authorize("admin", "manager"),
  getLeaves
);

// GET LEAVES OF CURRENT EMPLOYEE ONLY
router.get(
  "/user/:employeeId",
  protect,
  authorize("employee", "manager", "admin"),
  getUserLeaves
);

// APPROVE LEAVE
router.put(
  "/:id/approve",
  protect,
  authorize("admin", "manager"),
  approveLeave
);

// REJECT LEAVE
router.put(
  "/:id/reject",
  protect,
  authorize("admin", "manager"),
  rejectLeave
);

export default router;

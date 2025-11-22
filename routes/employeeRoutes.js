import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// --------------------------------------------------
// GET ALL EMPLOYEES
// Roles: admin, manager
// --------------------------------------------------
router.get("/", protect, authorize("admin", "manager", "employee"), getEmployees);


// --------------------------------------------------
// CREATE EMPLOYEE
// Role: admin only
// --------------------------------------------------
router.post("/", protect, authorize("admin"), createEmployee);

// --------------------------------------------------
// GET EMPLOYEE BY ID
// Roles: admin, manager, (employee can view own data via UI logic)
// --------------------------------------------------
router.get("/:id", protect, getEmployeeById);

// --------------------------------------------------
// UPDATE EMPLOYEE
// Roles: admin, manager
// --------------------------------------------------
router.put("/:id", protect, authorize("admin", "manager"), updateEmployee);

// --------------------------------------------------
// DELETE EMPLOYEE
// Role: admin only
// --------------------------------------------------
router.delete("/:id", protect, authorize("admin"), deleteEmployee);

export default router;

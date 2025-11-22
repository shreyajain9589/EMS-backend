import express from "express";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from "../controllers/departmentController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL DEPARTMENTS
router.get("/", protect, getDepartments);

// CREATE DEPARTMENT (Admin only)
router.post("/", protect, authorize("admin"), createDepartment);

// UPDATE DEPARTMENT (Admin only)
router.put("/:id", protect, authorize("admin"), updateDepartment);

// DELETE DEPARTMENT (Admin only)
router.delete("/:id", protect, authorize("admin"), deleteDepartment);

export default router;

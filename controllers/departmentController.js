import Department from "../models/Department.js";

// --------------------------------------------------
// GET ALL DEPARTMENTS
// GET /api/departments
// Roles: admin, manager, employee
// --------------------------------------------------
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json(departments);
  } catch (error) {
    console.error("Get Departments Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------------------------------------
// CREATE DEPARTMENT
// POST /api/departments
// Role: admin only
// --------------------------------------------------
export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if department already exists
    const exists = await Department.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const department = await Department.create({ name, description });

    res.status(201).json(department);
  } catch (error) {
    console.error("Create Department Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------------------------------------
// UPDATE DEPARTMENT
// PUT /api/departments/:id
// Role: admin only
// --------------------------------------------------
export const updateDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const updated = await Department.findByIdAndUpdate(
      departmentId,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update Department Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------------------------------------
// DELETE DEPARTMENT
// DELETE /api/departments/:id
// Role: admin only
// --------------------------------------------------
export const deleteDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const deleted = await Department.findByIdAndDelete(departmentId);

    if (!deleted) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Delete Department Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

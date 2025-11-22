import Employee from "../models/Employee.js";

// --------------------------------------------------
// GET ALL EMPLOYEES
// --------------------------------------------------
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department", "name")
      .populate("manager", "name email")
      .sort({ createdAt: -1 });

    res.json({ data: employees });
  } catch (error) {
    console.error("Get Employees Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------------------------------------
// GET EMPLOYEE BY ID
// --------------------------------------------------
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("department", "name")
      .populate("manager", "name email");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ data: employee });
  } catch (error) {
    console.error("Get Employee By ID Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------------------------------------
// CREATE EMPLOYEE  🔥 UPDATED
// --------------------------------------------------
export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      designation,
      department,
      salary,
      status,
      joiningDate,
      manager,
      password      // 👈 include password
    } = req.body;

    const exists = await Employee.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Employee with this email already exists" });
    }

    const employee = await Employee.create({
      name,
      email,
      phone,
      designation,
      department,
      salary,
      status,
      joiningDate,
      manager,
      password     // 👈 store password
    });

    res.status(201).json({ data: employee });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------------------------------------
// UPDATE EMPLOYEE
// --------------------------------------------------
export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ data: updated });
  } catch (error) {
    console.error("Update Employee Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------------------------------------
// DELETE EMPLOYEE
// --------------------------------------------------
export const deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);

    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await emp.deleteOne();

    res.json({ message: "Employee removed successfully" });
  } catch (error) {
    console.error("Delete Employee Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

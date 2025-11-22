import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

// --------------------------------------------------
// APPLY FOR LEAVE
// POST /api/leaves
// Roles: employee, manager, admin
// --------------------------------------------------
export const createLeave = async (req, res) => {
  console.log("🔥 CREATE LEAVE BODY:", req.body);
  console.log("🔥 USER:", req.user);

  try {
    const { employeeId, startDate, endDate, type, reason } = req.body;

    const emp = await Employee.findById(employeeId);
    console.log("🌟 Found Employee:", emp);

    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const leave = await Leave.create({
      employee: employeeId,
      startDate,
      endDate,
      type,
      reason,
      status: "pending",
      createdBy: req.user._id
    });

    return res.status(201).json(leave);

  } catch (error) {
    console.error("❌ CREATE LEAVE SERVER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


// --------------------------------------------------
// GET ALL LEAVES  (Admin / Manager)
// GET /api/leaves
// --------------------------------------------------
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "name email designation")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    console.error("Get Leaves Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------------------------------------
// GET LEAVES OF SPECIFIC EMPLOYEE
// GET /api/leaves/user/:employeeId
// --------------------------------------------------
export const getUserLeaves = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    // EMPLOYEE CAN ONLY ACCESS THEIR OWN LEAVES
    if (req.user.role === "employee" && req.user._id.toString() !== employeeId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Admin / Manager can view any user's leaves
    const leaves = await Leave.find({ employee: employeeId })
      .populate("employee", "name email")
      .sort({ createdAt: -1 });

    res.json(leaves);

  } catch (error) {
    console.error("Get User Leaves Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// --------------------------------------------------
// APPROVE LEAVE
// PUT /api/leaves/:id/approve
// Roles: admin, manager
// --------------------------------------------------
export const approveLeave = async (req, res) => {
  try {
    const leaveId = req.params.id;

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = "approved";
    leave.approvedBy = req.user._id;

    await leave.save();

    res.json(leave);
  } catch (error) {
    console.error("Approve Leave Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------------------------------------
// REJECT LEAVE
// PUT /api/leaves/:id/reject
// Roles: admin, manager
// --------------------------------------------------
export const rejectLeave = async (req, res) => {
  try {
    const leaveId = req.params.id;

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = "rejected";
    leave.approvedBy = req.user._id;

    await leave.save();

    res.json(leave);
  } catch (error) {
    console.error("Reject Leave Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

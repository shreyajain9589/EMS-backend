import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    type: {
      type: String,
      enum: ["casual", "sick", "annual", "unpaid"],
      default: "casual"
    },

    reason: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"    // 👈 UPDATED
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",   // 👈 UPDATED
      default: null
    }
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;

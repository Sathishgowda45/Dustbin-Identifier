import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    dustbinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dustbin",
      required: true
    },

    message: {
      type: String,
      required: true,
      default: "Dustbin is full"
    },

    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
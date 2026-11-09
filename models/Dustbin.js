import mongoose from "mongoose";

const dustbinSchema = new mongoose.Schema(
  {
    binId: {
      type: String,
      required: true,
      unique: true
    },

    city: {
      type: String,
      required: true
    },

    area: {
      type: String,
      required: true
    },

    street: {
      type: String,
      required: true
    },

    landmark: {
      type: String
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Available", "Full"],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

const Dustbin = mongoose.model("Dustbin", dustbinSchema);

export default Dustbin;

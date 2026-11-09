import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const adminEmail = "admin@dustbinfinder.com";

    // Check if admin already exists
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log("Admin already exists:");
      console.log(`  Email: ${existing.email}`);
      console.log(`  Role: ${existing.role}`);

      // Make sure role is admin
      if (existing.role !== "admin") {
        existing.role = "admin";
        await existing.save();
        console.log("  → Updated role to admin");
      }
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin user created!");
      console.log(`  Email: ${adminEmail}`);
      console.log(`  Password: admin123`);
    }

    console.log("\nYou can now login with:");
    console.log("  Email: admin@dustbinfinder.com");
    console.log("  Password: admin123");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedAdmin();


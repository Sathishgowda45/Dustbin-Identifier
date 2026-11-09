import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate 6-digit code
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registration successful"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const correctPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!correctPassword) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// FORGOT PASSWORD - Send code to email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email"
      });
    }

    const code = generateCode();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetCode = code;
    user.resetCodeExpiry = expiry;
    await user.save();

    // Send email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Dustbin Finder - Password Reset Code",
        html: `
          <div style="font-family: Arial; padding: 20px; background: #f4f4f4;">
            <div style="max-width: 400px; margin: auto; background: white; padding: 30px; border-radius: 10px;">
              <h2 style="color: #667eea;">🗑️ Dustbin Finder</h2>
              <p>Your password reset code is:</p>
              <h1 style="text-align: center; color: #667eea; letter-spacing: 8px; font-size: 36px;">${code}</h1>
              <p style="color: #888;">This code expires in 10 minutes.</p>
            </div>
          </div>
        `,
      });

      console.log(`Reset code for ${email}: ${code}`);

      res.json({
        message: "Reset code sent to your email"
      });
    } catch (emailError) {
      // If email fails, still log the code for demo
      console.log(`[EMAIL FAILED] Reset code for ${email}: ${code}`);
      res.json({
        message: "Reset code generated (check server console if email not configured)",
        code: code // Remove this line in production
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// VERIFY CODE & RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!user.resetCode || user.resetCode !== code) {
      return res.status(400).json({
        message: "Invalid reset code"
      });
    }

    if (user.resetCodeExpiry < new Date()) {
      return res.status(400).json({
        message: "Reset code has expired"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetCode = null;
    user.resetCodeExpiry = null;
    await user.save();

    res.json({
      message: "Password reset successful! You can now login."
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

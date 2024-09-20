import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js"; // Ensure the path is correct
import OTPVerificationModel from "../models/OTPVerification.js"; // Ensure this model exists

class Usercontrollers {
  static async sendVerificationEmail(user) {
    try {
      // Generate a verification token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "your_jwt_secret",
        {
          expiresIn: "1h",
        }
      );
      const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

      // Configure nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER || "your-email@gmail.com",
          pass: process.env.EMAIL_PASS || "your-email-password",
        },
      });

      // Send the verification email
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to: user.email,
        subject: "Email Verification",
        text: `Please verify your email by clicking the following link: ${verificationUrl}`,
      });

      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }

  static async verifyEmail(req, res) {
    const { token } = req.query;

    try {
      // Verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_jwt_secret"
      );

      // Update the user's email verification status
      const user = await UserModel.findByIdAndUpdate(
        decoded.userId,
        { isEmailVerified: true }, // Set to true for verified
        { new: true }
      );

      if (!user) {
        return res.status(404).send("User not found");
      }

      res.send("Email verified successfully!");
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(400).send("Invalid or expired token");
    }
  }
}

// Export the class as default
export default Usercontrollers;

// Export the sendVerificationEmail method from the class
export const sendVerificationEmail = Usercontrollers.sendVerificationEmail;

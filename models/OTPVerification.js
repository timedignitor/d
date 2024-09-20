import mongoose from "mongoose";
import RegisterModel from "./RegisterModel.js"; // Ensure this path is correct

// Define the OTPVerification Schema
const OTPVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register", // Ensure "Register" is the correct model name
    required: true,
  },
  otp: {
    type: String,
    required: true, // This will store the hashed OTP
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // OTP will automatically expire after 1 hour (3600 seconds)
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Create the OTPVerification model
const OTPVerification = mongoose.model(
  "OTPVerification",
  OTPVerificationSchema
);

export default OTPVerification;

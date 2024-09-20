import cloudinary from "cloudinary";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import RegisterModel from "../models/Registermodel.js";
// import { sendVerificationEmail } from "./Usercontrollers.js";
import OTPVerification from "../models/OTPVerification.js";
import fileUpload from "express-fileupload";
import nodemailer from "nodemailer";
// import Usercontrollers from "./Usercontrollers.js";

import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
import { config as dotenvConfig } from "dotenv";
import { uuid } from "uuidv4";

// Load environment variables
dotenvConfig();

// Configure Cloudinary
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
  cloud_name: "duqvffqxj",
  api_key: "544725582772525",
  api_secret: "ze0Sz6l13HR35vbcoOCpsYNHNjk",
});
class UserController {
  static createuser = async (req, res) => {
    const file = req.files.images;
    const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "Id_Proof",
    });
    console.log(myimage);
    try {
      const { name, email, password, phone, currentAddress, images } = req.body;
      const data = new UserModel({
        name,
        email,
        password,
        phone,
        currentAddress,
        userId: uuid(),
        images: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });
      await data.save();
      const token = jwt.sign(
        { userId: data.userId }, // Payload (you can add more user info if needed)
        process.env.JWT_SECRET, // Replace with your actual secret key
        { expiresIn: "1h" } // Token expiry time
      );
      res.status(201).json({
        message: "User registered successfully",
        userId: data.userId,
        success: true,
        token,
        data,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "BAD REQUEST",
      });
      console.log(error);
    }
  };
  // static async register(req, res) {
  //   try {
  //     const { name, email, password, cpassword } = req.body;

  //     // Check if all fields are provided
  //     if (!name || !email || !password || !cpassword) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "All fields are required",
  //       });
  //     }

  //     // Check if password and confirm password match
  //     if (password !== cpassword) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Passwords do not match",
  //       });
  //     }

  //     // Check if the user already exists
  //     const existingUser = await RegisterModel.findOne({ email });
  //     if (existingUser) {
  //       return res.status(409).json({
  //         success: false,
  //         message: "User with this email already exists",
  //       });
  //     }

  //     // Hash the password
  //     const hashedPassword = await bcrypt.hash(password, 8);

  //     // Create the new user
  //     const newUser = new RegisterModel({
  //       name,
  //       email,
  //       password: hashedPassword,
  //       // user: req.userId, // Commented out if not applicable
  //     });

  //     // Save the user to the database
  //     await newUser.save();

  //     // Respond with success and the new user data (without password)
  //     res.status(201).json({
  //       success: true,
  //       message: "User registered successfully",
  //       user: {
  //         id: newUser._id,
  //         name: newUser.name,
  //         email: newUser.email,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Server error during registration",
  //     });
  //   }
  // }

  // static async sendVerificationEmail(user, res) {
  //   try {
  //     // Generate verification token
  //     const token = jwt.sign(
  //       { userId: user._id },
  //       process.env.JWT_SECRET || "your_jwt_secret",
  //       {
  //         expiresIn: "1h",
  //       }
  //     );
  //     const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

  //     // Configure nodemailer
  //     const transporter = nodemailer.createTransport({
  //       service: "Gmail",
  //       auth: {
  //         user: process.env.EMAIL_USER || "your-email@gmail.com",
  //         pass: process.env.EMAIL_PASS || "your-email-password", // Ensure this is correct
  //       },
  //     });

  //     // Send the verification email
  //     await transporter.sendMail({
  //       from: process.env.EMAIL_USER || "your-email@gmail.com",
  //       to: user.email,
  //       subject: "Email Verification",
  //       html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">Verify Email</a></p>`,
  //     });

  //     console.log("Verification email sent successfully");
  //   } catch (error) {
  //     console.error("Error sending verification email:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Failed to send verification email",
  //     });
  //   }
  // }

  // static async verifyEmail(req, res) {
  //   const { token } = req.query;

  //   try {
  //     // Verify token
  //     const decoded = jwt.verify(
  //       token,
  //       process.env.JWT_SECRET || "your_jwt_secret"
  //     );

  //     // Update user's email verification status
  //     const user = await UserModel.findByIdAndUpdate(
  //       decoded.userId,
  //       { isEmailVerified: true },
  //       { new: true }
  //     );

  //     if (!user) {
  //       return res.status(404).send("User not found");
  //     }

  //     res.send("Email verified successfully!");
  //   } catch (error) {
  //     console.error("Error verifying email:", error);
  //     res.status(400).send("Invalid or expired token");
  //   }
  // }

  // static async verifylogin(req, res) {
  //   try {
  //     const { email, password } = req.body;

  //     if (!email || !password) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "All fields are required",
  //       });
  //     }

  //     // Find user by email
  //     const user = await UserModel.findOne({ email });
  //     if (!user) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "User not registered",
  //       });
  //     }

  //     // Compare password
  //     const isMatched = await bcrypt.compare(password, user.password);
  //     if (!isMatched) {
  //       return res.status(401).json({
  //         success: false,
  //         message: "Invalid email or password",
  //       });
  //     }

  //     // Token generation
  //     const token = jwt.sign(
  //       { id: user._id },
  //       process.env.JWT_SECRET || "your_jwt_secret"
  //     );
  //     res.cookie("token", token, { httpOnly: true });

  //     res.status(200).json({
  //       success: true,
  //       message: "Login successful",
  //     });
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Server error during login",
  //     });
  //   }
  // }

  // static async verifylogin(req, res) {
  //   try {
  //     const { email, password } = req.body;
  //     if (email && password) {
  //       const user = await UserModel.findOne({ email: email });
  //       if (user != null) {
  //         const ismatched = await bcrypt.compare(password, user.password);
  //         if (user.email === email && ismatched) {
  //           // Token generation
  //           const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  //           res.cookie("token", token);
  //           res.status(201).json({
  //             success: true,
  //             message: "Login successful",
  //           });
  //         } else {
  //           res.status(404).json({
  //             success: false,
  //             message: "Invalid email or password",
  //           });
  //         }
  //       } else {
  //         res.status(404).json({
  //           success: false,
  //           message: "User not registered",
  //         });
  //       }
  //     } else {
  //       res.status(404).json({
  //         success: false,
  //         message: "All fields are required",
  //       });
  //     }
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: "Server error during login",
  //     });
  //   }
  // }
  static async register(req, res) {
    try {
      const { name, email, password, cpassword } = req.body;

      // Check if all fields are provided
      if (!name || !email || !password || !cpassword) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check if password and confirm password match
      if (password !== cpassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
        });
      }

      // Check if the user already exists
      const existingUser = await RegisterModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 8);

      // Create the new user (Set isVerified to false initially)
      const newUser = new RegisterModel({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
      });

      // Save the user to the database
      await newUser.save();
      // Generate a JWT token
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "1h" }
      );
       
      // Send OTP verification email
      await UserController.sendOTPEmail(newUser, res);

      res.status(201).json({
        success: true,
        message: "User registered successfully, verification email sent.",
        token
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({
        success: false,
        message: "Server error during registration",
      });
    }
  }
  static async sendOTPEmail(user, res) {
    try {
      // Generate a 4-digit OTP
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

      // Hash the OTP and store it
      const saltRounds = 10;
      const hashedOTP = await bcrypt.hash(otp, saltRounds);

      // Create an OTP verification record
      const newOTPVerification = new OTPVerification({
        userId: user._id,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000, // Expires in 1 hour
      });

      // Save the OTP verification record to the database
      await newOTPVerification.save();

      // Configure nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER || "timedignitor1000@gmail.com",
          pass: process.env.EMAIL_PASS || "qzfycwuploztfyhg",
        },
      });

      // Send the OTP email
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "timedignitor1000@gmail.com",
        to: user.email,
        subject: "Email Verification OTP",
        html: `<p>Your OTP for email verification is <b>${otp}</b>. This code expires in 1 hour.</p>`,
      });

      console.log("OTP email sent successfully");
    } catch (error) {
      console.error("Error sending OTP email:", error);
      res.status(500).json({
        success: false,
        message: `Failed to send OTP email: ${error.message}`,
      });
    }
  }
  // Method to send verification email
  // static async sendVerificationEmail(user, res) {
  //   try {
  //     const token = jwt.sign(
  //       { userId: user._id },
  //       process.env.JWT_SECRET || "your_jwt_secret",
  //       { expiresIn: "1h" }
  //     );
  //     const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

  //     const transporter = nodemailer.createTransport({
  //       service: "Gmail",
  //       auth: {
  //         user: process.env.EMAIL_USER || "timedignitor1000@gmail.com",
  //         pass: process.env.EMAIL_PASS || "qzfycwuploztfyhg",
  //       },
  //     });

  //     await transporter.sendMail({
  //       from: process.env.EMAIL_USER || "timedignitor1000@gmail.com",
  //       to: "jayrajrao15@gmail.com",
  //       subject: "Email Verification",
  //       html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">Verify Email</a></p>`,
  //     });

  //     console.log("Verification email sent successfully");
  //   } catch (error) {
  //     console.error("Error sending verification email:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: `Failed to send verification email: ${error.message}`,
  //     });
  //   }
  // }

  static async verifyEmail(req, res) {
    const { token, otp } = req.query;
  
    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      const userId = decoded.userId;
  
      // Find the OTP verification record
      const otpRecord = await OTPVerification.findOne({ userId });
      if (!otpRecord) {
        return res.status(404).send("OTP record not found");
      }
  
      // Check if OTP is expired
      if (Date.now() > otpRecord.expiresAt) {
        return res.status(400).send("OTP has expired");
      }
  
      // Compare provided OTP with the stored hashed OTP
      const isMatch = await bcrypt.compare(otp, otpRecord.otp);
      if (!isMatch) {
        return res.status(400).send("Invalid OTP");
      }
  
      // Update the user's email verification status
      const user = await RegisterModel.findOneAndUpdate(
        { _id: userId },
        { isEmailVerified: true }, // Update the field accordingly
        { new: true }
      );
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      // Optionally, delete the OTP record after successful verification
      await OTPVerification.deleteOne({ userId });
  
      res.send("Email verified successfully!");
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(400).send("Invalid or expired token");
    }
  }


  static async logout(req, res) {
    try {
      res.clearCookie("token");
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error during logout",
      });
    }
  }
}

export default UserController;

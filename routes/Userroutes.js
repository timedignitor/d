import express from "express";
import cloudinary from "cloudinary";
// import bcrypt from 'bcrypt';
// import RegisterModel from '../models/Registermodel.js';
// import { sendVerificationEmail } from './Usercontrollers.js';
// import Usercontrollers from './Usercontrollers.js';
import pkg from "uuid";
import jwt from "jsonwebtoken";
// import nodemailer from 'nodemailer';
// import { config as dotenvConfig } from "dotenv";
import UserModel from "../models/UserModel.js";
// dotenvConfig();

// Load environment variables

const userrouter = express.Router();
// Configure Cloudinary
cloudinary.config({
  cloud_name: "duqvffqxj",
  api_key: "544725582772525",
  api_secret: "ze0Sz6l13HR35vbcoOCpsYNHNjk",
});
userrouter.post("/createuser", async (req, res) => {
  //   const file = req.files.images;
  const file = req.files.images;

  const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "Id_Proof",
  });

  try {
    const { name, email, password, phone, currentAddress, images } = req.body;

    const data = new UserModel({
      name,
      email,
      password,
      phone,
      currentAddress,
      userId: uuidv4(),
      images: {
        public_id: myimage.public_id,
        url: myimage.secure_url,
      },
    });

    await data.save();

    const token = jwt.sign({ userId: data.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: data.userId,
      success: true,
      token,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "BAD REQUEST",
    });
    console.log(error);
  }
});

export default userrouter;

// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import cloudinary from "cloudinary";
import web from "./routes/web.js";
import connectdb from "./db/connectdb.js";
import helmet from "helmet";
import morgan from "morgan"; // Import morgan
// import userrouter from "./routes/Userroutes.js";
const app = express();

const port = process.env.PORT || 3911;

// Set security HTTP headers
app.use(helmet());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configure Cloudinary (replace with your actual credentials)
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Middleware

// Setup morgan for logging HTTP requests
app.use(morgan("dev")); // Use 'dev' for concise, colored output in development

// Routes
app.use("/api", web);
// app.use("/api", userrouter);
// Server startup function
const StarterApp = async (req, res, next) => {
  try {
    // MongoDB connection
    await connectdb();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    next(error);
  }
};

StarterApp();

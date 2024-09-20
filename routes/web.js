import express from "express";
// import auth from '../middleware/auth.js'; // Update to .js if necessary
import UserController from "../controller/UserController.js"; // Update to .js if necessary
import ProductController from "../controller/ProductController.js"; // Update to .js if necessary
// import Usercontrollers from "../controller/Usercontrollers.js"; // Update to .js if necessary

const router = express.Router();

// Product routes
router.post("/create", ProductController.create);
router.get("/display", ProductController.display);
router.get("/view/:id", ProductController.view);
router.put("/update/:id", ProductController.update);
router.delete("/delete/:id", ProductController.delete);

// Auth routes
// Uncomment and update based on your auth requirements
// router.get('/verify-email', async (req, res) => {
//     const { token } = req.query;
//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, 'jayrajrao1');
//         // Find the user by ID and update the email verification status
//         await UserModel.findByIdAndUpdate(decoded.userId, { isEmailVerified: true });
//         res.send('Email verified successfully!');
//     } catch (error) {
//         res.status(400).send('Invalid or expired token');
//     }
// });

// User email verification
// router.get("/verify-email", Usercontrollers.verifyEmail);

// Example of calling sendVerificationEmail after user registration
// router.post("/register", async (req, res) => {
//   try {
//     // Assuming you have logic to register a user
//     const user = new UserModel(req.body);
//     await user.save();
//     // Send verification email
//     await Usercontrollers.sendVerificationEmail(user);
//     res.status(201).send("User registered. Verification email sent.");
//   } catch (error) {
//     res.status(500).send("Registration failed");
//   }
// });

// User routes
router.post("/createuser", UserController.createuser);
router.get("/verifyemail", UserController.verifyEmail);
router.post("/register", UserController.register);
router.post("/logout", UserController.logout);

// Export router
export default router;

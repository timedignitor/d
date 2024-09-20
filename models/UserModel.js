import mongoose from "mongoose";
// import * as uuid from "uuid"; // Import the entire module

// const { v4: uuidv4 } = uuid; // Destructure the v4 function from the uuid objectimport { uuid } from "uuidv4";
import { uuid } from "uuidv4";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    lowercase: true, // Convert the email to lowercase before saving
    trim: true, // Remove whitespace from the email
    validate: {
      validator: function (v) {
        // Regular expression to validate email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Basic validation for a 10-digit phone number
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
});

// Generate a unique userId using uuid before saving
UserSchema.pre("save", function (next) {
  if (this.isNew) {
    this.userId = uuid(); // Generate a unique userId using uuid
  }
  next();
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

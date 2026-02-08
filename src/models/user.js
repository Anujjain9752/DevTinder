const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      match: /^[a-zA-Z\s]+$/,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 50,
      match: /^[a-zA-Z\s]+$/,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      // select: false, // to exclude the password field when fetching user data
      validate(value){
         if(!validator.isStrongPassword(value)){
          throw new Error("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol for example Abc@123");
         }  
      },
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [100, "Age must be at most 100"],
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL for photo");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the userr",
      maxlength: 500,
      trim: true,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

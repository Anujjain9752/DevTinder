const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol for example Abc@123",
          );
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
      enum: {
         values: ["male" , "female" , "other"],
         message: `{VALUE} is not a valid gender type`
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

// we will define a method in the user model to generate a jwt token , to explain in a better way - > when we will login the user we will generate a jwt token and send it to the client and the client will store it in the cookie and send it with every request to the server and the server will verify the token and if it is valid then it will allow the user to access the protected routes and we are doing it in model user.js because we want to keep the logic of generating a jwt token in one place and we can use it in multiple places in our application

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "anuj", {
    expiresIn: "1d",
  });

  return token;
};

// now we can also do it for passwords to compare the password entered by the user with the hashed password stored in the database we can define a method in the user model to compare the password and return true or false

userSchema.methods.validatePassword = async function (passwordInputByUser) {
 
  const passwordHash = this.password; // this.password will give us the hashed password stored in the database

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

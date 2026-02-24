const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/ses"); // for email try 

authRouter.post("/signup", async (req, res) => {
  try {
    // validate the incoming data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrpyt the passowrd now we will do it as now out data is validated

    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // console.log(user);

    const savedUser = await user.save();
    
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000 )
    })



    res.json({message: "User added successfully", data: savedUser});
  } catch (err) {
    res.status(400).json({ message: "Error adding user", error: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // you can check for the email id

    // first we check if email id exists in the database or not if it does not exist we will return an error message

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // there is a fucntion to write we call it bcrypt.compare() it will compare the password with the hash password stored in the database and return true or false
    const isPasswordValid = await user.validatePassword(password); // we have defined a method in the user model to compare the password and return true or false

    if (isPasswordValid) {
      // generate a jwt token
      const token = await user.getJWT(); // we have defined a method in the user model to generate a jwt token

      // res.cookie("token", token, {
      //   expires: new Date(Date.now() + 8 * 3600000),
      // }); // set the token in the cookie

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });


      
  // Allowed emails list
  const allowedEmails = [
    "anujjain9800@gmail.com",
    "gthefeel@gmail.com",
  ];


 // Send email only for allowed users (non-blocking)
  try {
    if (allowedEmails.includes(user.emailId)) {
      await sendEmail(
        user.emailId,
        "Login Successful",
        "You have successfully logged into DevTinder 🚀"
      );
    }
  } catch (err) {
    console.error("Email failed:", err.message);
  }








      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).json({ message: "Error logging in", error: err.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout successful");
});

module.exports = authRouter;

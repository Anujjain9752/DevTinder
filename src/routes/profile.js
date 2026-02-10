const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // we have set the user in the request object in the auth middleware so we can access it here

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User found", user });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: err.message });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid fields in the request body");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.send(`${loggedInUber.firstName}, Profile updated successfully`);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error editing profile", error: err.message });
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const { oldPassword, newPassword } = req.body;

    // 1️⃣ Check required fields
    if (!oldPassword || !newPassword) {
      return res.status(400).send("Old password and new password are required");
    }

    // 2️⃣ Validate old password (VERY IMPORTANT)
    const isPasswordValid = await user.validatePassword(oldPassword);
    if (!isPasswordValid) {
      return res.status(401).send("Old password is incorrect");
    }

    // 3️⃣ Validate new password
    if (newPassword.length < 5 || newPassword.length > 20) {
      return res
        .status(400)
        .send("Password length must be between 5 and 20 characters");
    }

    // 4️⃣ Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // 5️⃣ Save
    user.password = newHashedPassword;
    await user.save();

    // 6️⃣ Success response
    res.status(200).send("Password updated successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});


module.exports = profileRouter;

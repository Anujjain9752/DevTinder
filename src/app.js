const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // creating a new instance of the user model
  const user = new User({
    firstName: "virat",
    lastName: "kohli",
    emailId: "virat@gmail.com",
    password: "12343436",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).json({ message: "Error adding user", error: err.message });
  }
});

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });

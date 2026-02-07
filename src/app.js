const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.use(express.json()); // to parse incoming JSON data , this is a middleware provided by express to parse the incoming request body as Json

app.post("/signup", async (req, res) => {
  // creating a new instance of the user model
  const user = new User(req.body);

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

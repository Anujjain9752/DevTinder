const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("1st response ");
    next();
  },
  (req, res, next) => {
    console.log("2nd response ");
    next();
  },
  (req, res) => {
    console.log("3rd response ");
    res.send("Hello from user route");
  },
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

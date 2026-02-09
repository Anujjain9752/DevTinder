const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");


app.use(cookieParser()); // to parse the cookies from the incoming request

app.use(express.json()); // to parse incoming JSON data , this is a middleware provided by express to parse the incoming request body as Json


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);








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

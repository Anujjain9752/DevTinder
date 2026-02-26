const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config()
const http = require("http")

require("./utils/cronjob")

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
 

app.use(express.json()); // to parse incoming JSON data , this is a middleware provided by express to parse the incoming request body as Json
app.use(cookieParser()); // to parse the cookies from the incoming request

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter)


  const server = http.createServer(app);

  initializeSocket(server);




connectDB()
  .then(() => {
    console.log("DB connected successfully");
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
  
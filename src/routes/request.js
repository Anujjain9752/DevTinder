const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");





requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + "is sent the connection request");
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Error sending connection request",
        error: err.message,
      });
  }
});

module.exports = requestRouter;

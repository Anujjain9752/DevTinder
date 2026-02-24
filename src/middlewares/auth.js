const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;

    if (!token) {
       return res.status(401).send("Please Login!")
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    // validate the token
    // find the user

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }



    req.user = user; // set the user in the request object for further use in the route handler
    next();
  } catch (err) {
    res.status(400).json({ message: "Unauthorized", error: err.message });
  }
};

module.exports = {
  userAuth
};

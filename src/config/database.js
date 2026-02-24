// to talk to database we will be using mongoose

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    process.env.DB_CONNECTION_SECRET,
  );
};

module.exports = connectDB;
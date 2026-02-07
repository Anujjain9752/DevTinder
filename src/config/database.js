// to talk to database we will be using mongoose

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:NxJwN5afChAWrt8u@namastenode.pm0hute.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
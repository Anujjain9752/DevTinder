const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value){
       if(!["male","female", "other"].includes(value)){
        throw new Error("Gender data not valid")
       }
    },

  },
  photoUrl: {
    type: String,
    default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",

  },
  about: {
    type: String,
    default: "This is a default about of the userr",
  },
  skills: {
    type: [String],
  },
}, {
  timestamps: true,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

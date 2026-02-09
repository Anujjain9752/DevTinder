// in this file we will write the validation logic for the incoming data to the server
const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("All fields are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  ); // this will check if all the fields in the request body are allowed to be edited or not if there is any field which is not allowed to be edited it will return false and we will throw an error

  return isEditAllowed;


};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};

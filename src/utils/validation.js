// in this file we will write the validation logic for the incoming data to the server
const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("All fields are required");
  }
  
  else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  }

  else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Please enter a strong password"
    );
  } 

  


};


module.exports = {
  validateSignUpData,
};
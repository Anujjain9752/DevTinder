const sendEmail = require("./src/utils/ses");

sendEmail(
  "gthefeel@gmail.com",
  "Test Email",
  "Hello from DevTinder 🚀"
)
  .then(() => console.log("Email sent successfully"))
  .catch((err) => console.error("Error:", err));
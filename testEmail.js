const sendEmail = require("./src/utils/ses");

sendEmail(
  "YOUR_RECEIVER_VERIFIED_EMAIL@gmail.com",
  "Test Email",
  "Hello from DevTinder 🚀"
)
  .then(() => console.log("Email sent successfully"))
  .catch((err) => console.error("Error:", err));
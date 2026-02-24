const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: "ap-southeast-2", // must match your SES region
});

const sendEmail = async (toEmail, subject, message) => {
  const params = {
    Source: "anujjain9800@gmail.com", // must be verified in SES
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Text: { Data: message },
      },
    },
  };

  const command = new SendEmailCommand(params);
  return await sesClient.send(command);
};

module.exports = sendEmail;
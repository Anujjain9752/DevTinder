const cron = require("node-cron");
const ConnectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./ses");
const { subDays, startOfDay, endOfDay } = require("date-fns");

cron.schedule("41 15 * * *", async () => {
  console.log("Running daily email summary job...");

  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    if (!pendingRequests.length) {
      console.log("No pending requests from yesterday.");
      return;
    }

    // Group requests by recipient
    const emailMap = {};

    for (const request of pendingRequests) {
      const recipientEmail = request.toUserId.emailId;

      if (!emailMap[recipientEmail]) {
        emailMap[recipientEmail] = [];
      }

      emailMap[recipientEmail].push(request.fromUserId.firstName);
    }

    const allowedEmails = [
      "anujjain9800@gmail.com",
      "gthefeel@gmail.com",
    ];

    for (const email in emailMap) {
      if (!allowedEmails.includes(email)) continue;

      const sendersList = emailMap[email].join(", ");

      try {
        await sendEmail(
          email,
          "Daily Friend Request Summary",
          `You received connection requests from: ${sendersList}`
        );

        console.log(`Summary email sent to ${email}`);
      } catch (err) {
        console.error(`Failed to send email to ${email}`, err.message);
      }
    }

  } catch (err) {
    console.error("Cron job failed:", err);
  }
});
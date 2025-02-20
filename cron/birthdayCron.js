// const cron = require('node-cron');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const { sendSMS } = require('../services/smsService');
const moment = require('moment');

const birthdayMessages = [
    "Wishing you a fantastic day filled with joy, laughter, and love. May this year bring you success, happiness, and all the things you dream of!",
    "Hope your birthday is as amazing as you are! May your year be filled with laughter, success, and endless happiness.",
    "May your day be filled with love, cake, and everything that makes you smile!",
    "Another year older, wiser, and even more awesome! Wishing you a birthday full of happiness and wonderful moments.",
    "Wishing you a day filled with love, surprises, and all the things that bring you happiness. Have a great one!",
    "May your day be as special as you are, filled with laughter, love, and everything that makes you happy.",
    "Cheers to another year of adventure and making unforgettable memories! Wishing you a fantastic birthday!",
    "May this year bring you closer to your dreams and fill your life with success, love, and laughter. Have an incredible birthday!",
    "On your special day, I hope you receive all the love and joy you bring to those around you. Happy Birthday!",
    "Sending you warm wishes on your special day. May your birthday be the beginning of a year full of success and happiness!",
    "Wishing you all the happiness in the world today and always. Have a wonderful birthday filled with love and laughter!",
    "Every birthday marks a new chapter in your life. May this one bring you endless joy and wonderful surprises!",
    "Wishing you a year ahead filled with adventure, love, and endless opportunities. Happy Birthday!"
];


exports.checkAndSendBirthdayMessages = async (req, res) => {
    console.log("Checking birthdays...");
    const today = moment().format('MM-DD');

    try {
        // Get only users whose birthday is today
        const users = await User.find({
            $expr: {
                $eq: [{ $dateToString: { format: "%m-%d", date: "$birthdate" } }, today]
            }
        });

        if (users.length === 0) {
            console.log("No birthdays today.");
            return res.json({ message: "No birthdays today." });
        }

        // Send emails in parallel
        const messagePromises = users.map(async (user) => {
            const randomMessage = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];
            const senderInfo = `From ${process.env.SENDER_NAME} (${process.env.SENDER_PHONE} / ${process.env.SENDER_EMAIL})`;
            const emailBody = `Happy Birthday, ${user.firstName}! 🎉\n\n${randomMessage}\n\nBest wishes,\n${process.env.SENDER_NAME}`;
            const emailPromise = sendEmail(user.email, emailBody, user._id);
            const smsPromise = sendSMS(user.phone, `${senderInfo}\n Happy Birthday, ${user.firstName}! 🎉 - ${randomMessage} - Best wishes, ${process.env.SENDER_NAME}`);

            return Promise.all([emailPromise, smsPromise]); // Run both email and SMS in parallel
        });

        await Promise.all(messagePromises); // Wait for all messages to be sent
        console.log(`Sent ${users.length} birthday messages!`);
        res.json({ message: `Sent ${users.length} birthday messages.` });

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error sending birthday messages." });
    }
};

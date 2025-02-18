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
        const users = await User.find();
        users.forEach(user => {
            if (moment(user.birthdate).format('MM-DD') === today) {
                // Pick a random message
                const randomMessage = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];
                // Send email
                sendEmail(user.email, `Happy Birthday, ${user.firstName}! 🎉\n\n${randomMessage}\n\nBest wishes,\nSuresh Shrestha`);
                // Send sms
                // sendSMS(user.phone, `Happy Birthday, ${user.firstName}! 🎉 - ${randomMessage} - Best wishes, Suresh Shrestha`);
            }
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

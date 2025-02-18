const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendEmail = async (email, message) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Happy Birthday!',
            text: message
        });
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

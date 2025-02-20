const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendEmail = async (email, message, userId) => {
    try {
        const unsubscribeLink = `${process.env.APP_URL}/users/unsubscribe/${userId}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Happy Birthday! 🎉',
            text: message,
            html: `
                <p style="font-size:16px;">${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p style="font-size:10px; color:gray;">
                    <a href="${unsubscribeLink}" style="color:#d9534f; text-decoration:none;">
                        Unsubscribe
                    </a>
                </p>
            `
        });
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
    }
};

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


// Function to send Welcome Email
exports.sendWelcomeEmail = async (email, firstName) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to the Birthday Mailing List 🎉",
      html: `<p>Hi ${firstName},</p>
             <p>Welcome to my Birthday Mailing List! 🎂 You'll receive a special birthday email from me on your special day.</p>
             <p>Cheers,</p>
             <p>${process.env.SENDER_NAME}</p>
             <hr>
             <p style="font-size:12px; color:gray;">
                If you received this email by mistake, you can safely ignore or delete it.
             </p>`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to ${email}`);
    } catch (error) {
      console.error(`❌ Error sending welcome email: ${error.message}`);
    }
};

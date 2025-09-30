const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (email, message, userId) => {
    try {
        const unsubscribeLink = `${process.env.APP_URL}/users/unsubscribe/${userId}`;
        const htmlContent = `
            <p style="font-size:16px;">${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p style="font-size:10px; color:gray;">
                <a href="${unsubscribeLink}" style="color:#d9534f; text-decoration:none;">
                    Unsubscribe
                </a>
            </p>
        `;

        const msg = {
            to: email,
            from: {
                email: process.env.SENDER_EMAIL,
                name: process.env.SENDER_NAME || 'Suresh Shrestha'
            },
            subject: 'Happy Birthday! 🎉',
            text: message,
            html: htmlContent
        };

        await sgMail.send(msg);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
    }
};

// Function to send Welcome Email
exports.sendWelcomeEmail = async (email, firstName) => {
    const htmlContent = `<div style="font-size:16px;">
            <p>Hi ${firstName},</p>
            <p>Welcome to my Birthday Mailing List! 🎂 You'll receive a special birthday email from me on your special day.</p>
            <p>Cheers,
            <br>
            ${process.env.SENDER_NAME}</p>
         </div>
         <hr>
         <p style="font-size:12px; color:gray;">
            If you received this email by mistake, you can safely ignore or delete it.
         </p>`;

    const msg = {
        to: email,
        from: {
            email: process.env.SENDER_EMAIL,
            name: process.env.SENDER_NAME || 'Suresh Shrestha'
        },
        subject: "Welcome to my Birthday Mailing List 🎉",
        html: htmlContent
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Welcome email sent to ${email}`);
    } catch (error) {
        console.error(`❌ Error sending welcome email to ${email}:`, error);
    }
};
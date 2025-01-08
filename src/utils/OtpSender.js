import nodemailer from "nodemailer";

export const sendVerificationCode = (medium, code, email, phoneNo) => {
    if (medium == "email") {
        const message = generateEmailTemplate(code);
        sendEmail(email, "Your Vrification Code", message);
    }
}

const sendEmail = async (mail, subject, msg) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMIP_HOST,
        service: process.env.SMTP_SERVICE,
        post: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        },
    });

    const options = {
        from: process.env.SMTP_MAIL,
        to: mail,
        subject,
        html: message
    }
    await transporter.sendMail(options);
}



const generateEmailTemplate = (code) => {
    return `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

    <div style="width: 100%; padding: 20px; background-color: #ffffff; margin: 0 auto; max-width: 600px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 20px 0; background-color: #007BFF; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Your OTP Code</h1>
        </div>

        <div style="padding: 20px; font-size: 16px; color: #555555;">
            <p>Hi [Recipient Name],</p>
            <p>Thank you for using our service. To verify your identity, please use the following One-Time Password (OTP) to complete your action:</p>
            <div style="font-size: 32px; font-weight: bold; color: #007BFF; margin: 20px 0; text-align: center;">
                ${code}
            </div>
            <p>This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        </div>

        <div style="padding: 10px 0; text-align: center; font-size: 14px; color: #777777;">
            <p>If you have any questions, feel free to <a href="mailto:support@example.com" style="color: #007BFF; text-decoration: none;">contact us</a>.</p>
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
    </div>

</div>`
}
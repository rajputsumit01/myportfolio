require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Validation helper
function isValidEmail(email) {
    return typeof email === 'string' && /\S+@\S+\.\S+/.test(email);
}

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body || {};

    // Validate inputs
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "All fields are required." });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, error: "Invalid sender email." });
    }

    // ✔ Create Transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,  // MUST be your Gmail
            pass: process.env.EMAIL_PASS,  // App password
        },
    });

    // Escape HTML helper
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    // ✔ PROFESSIONAL BLACK & WHITE EMAIL TEMPLATE
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Segoe UI',Arial,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f5f5f5;">
            <tr>
                <td align="center" style="padding:40px 20px;">
                    
                    <!-- MAIN CONTAINER -->
                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" 
                           style="background-color:#ffffff;border:1px solid #e0e0e0;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
                        
                        <!-- HEADER -->
                        <tr>
                            <td style="padding:30px 40px;background-color:#000000;border-bottom:2px solid #000000;">
                                <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;letter-spacing:1px;">
                                    Portfolio Contact
                                </h1>
                            </td>
                        </tr>
                    
                        <!-- BODY CONTENT -->
                        <tr>
                            <td style="padding:40px;">
                                
                                <!-- GREETING -->
                                <h2 style="margin:0 0 10px 0;color:#000000;font-size:20px;font-weight:600;">
                                    New Contact Message
                                </h2>
                                <p style="margin:0 0 30px 0;color:#666666;font-size:14px;line-height:1.6;">
                                    You have received a new message through your portfolio contact form.
                                </p>

                                <!-- CONTACT INFORMATION -->
                                <table width="100%" cellspacing="0" cellpadding="0" border="0" 
                                       style="background-color:#f9f9f9;border:1px solid #e0e0e0;border-radius:4px;margin-bottom:30px;">
                                    <tr>
                                        <td style="padding:20px;border-bottom:1px solid #e0e0e0;">
                                            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td style="width:100px;padding:0;vertical-align:top;">
                                                        <strong style="color:#000000;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">
                                                            Name
                                                        </strong>
                                                    </td>
                                                    <td style="padding:0;color:#333333;font-size:15px;line-height:1.6;">
                                                        ${escapeHtml(name)}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:20px;">
                                            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td style="width:100px;padding:0;vertical-align:top;">
                                                        <strong style="color:#000000;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">
                                                            Email
                                                        </strong>
                                                    </td>
                                                    <td style="padding:0;color:#333333;font-size:15px;line-height:1.6;">
                                                        <a href="mailto:${escapeHtml(email)}" 
                                                           style="color:#000000;text-decoration:underline;">
                                                            ${escapeHtml(email)}
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- MESSAGE SECTION -->
                                <div style="margin-bottom:30px;">
                                    <h3 style="margin:0 0 15px 0;color:#000000;font-size:15px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;border-bottom:2px solid #000000;padding-bottom:8px;">
                                        Message
                                    </h3>
                                    <div style="background-color:#ffffff;border:1px solid #e0e0e0;border-left:4px solid #000000;padding:20px;border-radius:4px;">
                                        <p style="margin:0;color:#333333;font-size:15px;line-height:1.8;white-space:pre-wrap;">
                                            ${escapeHtml(message).replace(/\n/g, '<br>')}
                                        </p>
                                    </div>
                                </div>

                                <!-- ACTION BUTTON -->
                                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td align="center" style="padding-top:20px;">
                                            <a href="mailto:${escapeHtml(email)}?subject=Re: Contact from ${escapeHtml(name)}" 
                                               style="display:inline-block;background-color:#000000;color:#ffffff;padding:12px 30px;text-decoration:none;border-radius:4px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">
                                                Reply to Message
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style="padding:30px 40px;background-color:#f9f9f9;border-top:1px solid #e0e0e0;">
                                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td align="center" style="padding-bottom:15px;">
                                            <p style="margin:0;color:#666666;font-size:12px;line-height:1.6;">
                                                This email was automatically generated from your portfolio contact form.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <p style="margin:0;color:#999999;font-size:11px;">
                                                © ${new Date().getFullYear()} Portfolio. All rights reserved.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    // ✔ CORRECT EMAIL SETTINGS
    const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // ✔ Always your Gmail
        to: process.env.RECEIVER_EMAIL,                         // ✔ Where YOU receive the message
        replyTo: email,                                          // ✔ User's email for replying
        subject: `New Message from ${escapeHtml(name)}`,
        html: html,
    };

    // Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        res.json({ success: true, messageId: info.messageId });
    } catch (err) {
        console.error("Send error:", err);
        res.status(500).json({ success: false, error: "Failed to send email." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

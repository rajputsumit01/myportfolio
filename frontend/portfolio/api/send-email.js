const nodemailer = require('nodemailer');

// Escape HTML helper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { name, email, message } = req.body || {};

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  // Validate email format
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email format.' });
  }

  // Check for environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.RECEIVER_EMAIL) {
    console.error('Missing email configuration in environment variables');
    return res.status(500).json({ 
      success: false, 
      error: 'Email service not configured. Please contact the administrator.' 
    });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Professional black & white email template
  const BRAND_NAME = process.env.BRAND_NAME || 'Portfolio Contact';
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
                  ${BRAND_NAME}
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
                        © ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
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

  const mailOptions = {
    from: `"${BRAND_NAME}" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    replyTo: email,
    subject: `New Message from ${escapeHtml(name)}`,
    html: html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    });
  }
};

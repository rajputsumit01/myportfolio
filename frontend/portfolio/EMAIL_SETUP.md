# Email Setup Guide for Contact Form

## Environment Variables Required

To enable the contact form email functionality, you need to set the following environment variables in Vercel:

### Required Variables:

1. **EMAIL_USER** - Your Gmail address (e.g., `your-email@gmail.com`)
2. **EMAIL_PASS** - Gmail App Password (NOT your regular Gmail password)
3. **RECEIVER_EMAIL** - Email address where you want to receive contact form messages

### Optional Variables:

4. **BRAND_NAME** - Brand name for email template (defaults to "Portfolio Contact")

## How to Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
3. Scroll down to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "Portfolio Contact Form" as the name
6. Click **Generate**
7. Copy the 16-character password (this is your `EMAIL_PASS`)

## Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - `EMAIL_USER` = your Gmail address
   - `EMAIL_PASS` = your Gmail App Password
   - `RECEIVER_EMAIL` = email where you want to receive messages
   - `BRAND_NAME` = (optional) your portfolio name
4. Make sure to select **Production**, **Preview**, and **Development** environments
5. Click **Save**
6. **Redeploy** your application for changes to take effect

## Local Development Setup

For local development, create a `.env` file in the `frontend/portfolio` directory:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECEIVER_EMAIL=your-email@gmail.com
BRAND_NAME=Sumit Portfolio
```

Then run your backend server:
```bash
cd backend
npm install
npm run dev
```

The frontend will automatically use `http://localhost:5000/send-email` in development mode.

## Testing

After setting up environment variables:
1. Fill out the contact form on your portfolio
2. Submit the form
3. Check your email inbox (the `RECEIVER_EMAIL` address)
4. You should receive a professional black & white formatted email

## Troubleshooting

- **Email not sending?** Check Vercel function logs in the Vercel dashboard
- **CORS errors?** The API function includes CORS headers automatically
- **Invalid credentials?** Make sure you're using an App Password, not your regular Gmail password
- **Function not found?** Ensure the `api/send-email.js` file exists and is committed to your repository

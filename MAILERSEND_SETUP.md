# MailerSend Email Integration Setup

This guide will help you set up MailerSend for the contact and quote forms on your IEMT Lab website.

## Prerequisites

- A MailerSend account (sign up at [mailersend.com](https://www.mailersend.com/))
- A verified domain in MailerSend (or use their testing domain for development)

## Setup Steps

### 1. Create a MailerSend Account

1. Go to [https://www.mailersend.com/](https://www.mailersend.com/)
2. Sign up for a free account (includes 12,000 emails/month on the free tier)

### 2. Verify Your Domain (Recommended for Production)

1. In the MailerSend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain name (e.g., `iemt-lab.com`)
4. Follow the DNS setup instructions to verify your domain
5. Wait for verification (can take a few minutes to a few hours)

**For Testing:** You can skip this step and use MailerSend's testing domain. However, emails will only be sent to verified recipients.

### 3. Get Your API Key

1. In the MailerSend dashboard, go to **Settings** → **API Tokens**
2. Click **Generate New Token**
3. Give it a name (e.g., "IEMT Lab Website")
4. Select the following permissions:
   - ✅ Email: Full access
5. Click **Create Token**
6. **IMPORTANT:** Copy the API key immediately - you won't be able to see it again!

### 4. Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Update the following variables:

```env
# Replace with your actual MailerSend API key
MAILERSEND_API_KEY=your_actual_api_key_here

# Replace with your verified sender email (must match your verified domain)
MAILERSEND_FROM_EMAIL=noreply@iemt-lab.com
MAILERSEND_FROM_NAME=IEMT Lab

# Where you want to receive contact/quote requests
MAILERSEND_TO_EMAIL=contact@iemt-lab.com
```

### 5. Verify Recipient Email (For Testing)

If you're using MailerSend's free tier or testing domain:

1. Go to **Recipients** → **Verification**
2. Add and verify the email address you want to receive test emails at
3. Check your inbox and click the verification link

### 6. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your website's contact form or click "Get Quote"
3. Fill out and submit the form
4. Check the recipient email inbox for the message

## Email Templates

The integration sends two types of emails:

### Contact Form Emails
- Subject: `New Contact Form Submission from [Name]`
- Includes: Name, email, and message
- Reply-to is set to the customer's email for easy responses

### Quote Request Emails
- Subject: `New Quote Request: [Product] - [Sub-Product]`
- Includes: Full customer details, location, product selection, and message
- Marked as priority for quick response
- Reply-to is set to the customer's email for easy responses

## Troubleshooting

### "Email service not configured" error
- Make sure your `.env.local` file exists and contains the API key
- Restart your Next.js development server after adding environment variables
- Check that `MAILERSEND_API_KEY` is not set to `your_api_key_here`

### Emails not being received
- Verify your domain in MailerSend (or add recipient to verified list for testing)
- Check your spam/junk folder
- Verify the API key has the correct permissions
- Check the browser console and server logs for error messages

### "Invalid sender email" error
- Make sure `MAILERSEND_FROM_EMAIL` matches your verified domain
- For testing, use the email format provided by MailerSend's testing domain

## Production Deployment

When deploying to production (Netlify):

1. Add environment variables in Netlify:
   - Go to **Site Settings** → **Environment Variables**
   - Add all variables from `.env.local`

2. Make sure your domain is fully verified in MailerSend

3. Test the forms after deployment to ensure everything works

## Rate Limits

MailerSend Free Tier:
- 12,000 emails/month
- 100 emails/hour
- Unlimited verified recipients

For higher volumes, consider upgrading to a paid plan.

## Security Notes

- Never commit `.env.local` to version control (it's already in `.gitignore`)
- Keep your API key secure and rotate it if compromised
- The API key should only be used in server-side code (API routes), never in client-side code
- Monitor your email usage in the MailerSend dashboard

## Support

For MailerSend-specific issues:
- Documentation: [https://developers.mailersend.com/](https://developers.mailersend.com/)
- Support: [https://www.mailersend.com/help](https://www.mailersend.com/help)

For integration issues, check the API route files:
- `src/app/api/contact/route.ts`
- `src/app/api/quote/route.ts`

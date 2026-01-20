import { NextRequest, NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// Initialize MailerSend client
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate API key
    if (!process.env.MAILERSEND_API_KEY || process.env.MAILERSEND_API_KEY === 'your_api_key_here') {
      console.error('MailerSend API key not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Prepare email parameters
    const sentFrom = new Sender(
      process.env.MAILERSEND_FROM_EMAIL || 'noreply@yourdomain.com',
      process.env.MAILERSEND_FROM_NAME || 'IEMT Lab'
    );

    const recipients = [
      new Recipient(
        process.env.MAILERSEND_TO_EMAIL || 'contact@iemt-lab.com',
        'IEMT Lab Team'
      ),
    ];

    // Create email content
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo({ email, name: `${firstName} ${lastName}` })
      .setSubject(`New Contact Form Submission from ${firstName} ${lastName}`)
      .setHtml(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e3a5f 0%, #0f1c2e 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #1e3a5f; margin-bottom: 5px; }
              .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #f59e0b; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">From:</div>
                  <div class="value">${firstName} ${lastName}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>This email was sent from the IEMT Lab contact form</p>
                  <p>Reply directly to this email to respond to ${firstName}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `)
      .setText(`
        New Contact Form Submission
        
        From: ${firstName} ${lastName}
        Email: ${email}
        
        Message:
        ${message}
        
        ---
        This email was sent from the IEMT Lab contact form
      `);

    // Send the email
    await mailerSend.email.send(emailParams);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: error.message || 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

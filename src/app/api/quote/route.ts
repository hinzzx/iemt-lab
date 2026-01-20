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
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      country, 
      city, 
      zipcode, 
      productType, 
      subProductType, 
      message 
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !country || !city || !zipcode || !productType || !subProductType || !message) {
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
        'IEMT Lab Sales Team'
      ),
    ];

    // Create email content
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo({ email, name: `${firstName} ${lastName}` })
      .setSubject(`New Quote Request: ${productType} - ${subProductType}`)
      .setHtml(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 700px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e3a5f 0%, #0f1c2e 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .section { margin-bottom: 25px; }
              .section-title { font-size: 18px; font-weight: bold; color: #1e3a5f; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #f59e0b; }
              .field { margin-bottom: 15px; display: flex; }
              .label { font-weight: bold; color: #1e3a5f; min-width: 150px; }
              .value { background: white; padding: 8px 12px; border-radius: 5px; border-left: 3px solid #f59e0b; flex: 1; }
              .message-box { background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #f59e0b; white-space: pre-wrap; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; color: #666; }
              .priority-badge { display: inline-block; background: #f59e0b; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">New Quote Request</h1>
                <div class="priority-badge">REQUIRES RESPONSE</div>
              </div>
              <div class="content">
                <div class="section">
                  <div class="section-title">Customer Information</div>
                  <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${firstName} ${lastName}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value"><a href="tel:${phone}">${phone}</a></div>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">Location</div>
                  <div class="field">
                    <div class="label">Country:</div>
                    <div class="value">${country}</div>
                  </div>
                  <div class="field">
                    <div class="label">City:</div>
                    <div class="value">${city}</div>
                  </div>
                  <div class="field">
                    <div class="label">Zipcode:</div>
                    <div class="value">${zipcode}</div>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">Product Interest</div>
                  <div class="field">
                    <div class="label">Product Type:</div>
                    <div class="value"><strong>${productType}</strong></div>
                  </div>
                  <div class="field">
                    <div class="label">Sub Product Type:</div>
                    <div class="value"><strong>${subProductType}</strong></div>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">Customer Message</div>
                  <div class="message-box">${message}</div>
                </div>

                <div class="footer">
                  <p><strong>This is a quote request from the IEMT Lab website</strong></p>
                  <p>Please respond within 24 hours</p>
                  <p>Reply directly to this email to respond to ${firstName}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `)
      .setText(`
        New Quote Request
        
        Product: ${productType} - ${subProductType}
        
        CUSTOMER INFORMATION
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        
        LOCATION
        Country: ${country}
        City: ${city}
        Zipcode: ${zipcode}
        
        MESSAGE
        ${message}
        
        ---
        This is a quote request from the IEMT Lab website
        Please respond within 24 hours
      `);

    // Send the email
    await mailerSend.email.send(emailParams);

    return NextResponse.json(
      { success: true, message: 'Quote request sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending quote email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send quote request', 
        details: error.message || 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

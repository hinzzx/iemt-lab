import { NextRequest, NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import {
  validateQuoteForm,
  escapeHtml,
  escapeHtmlWithLineBreaks,
  checkRateLimit,
  getClientIp,
  type QuoteFormData,
} from '@/lib/validation';

// Initialize MailerSend client
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

// Rate limit configuration
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests (quote requests are more valuable)
const RATE_LIMIT_WINDOW_MS = 60000; // per minute

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request.headers);
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(
      `quote:${clientIp}`,
      RATE_LIMIT_MAX_REQUESTS,
      RATE_LIMIT_WINDOW_MS
    );

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.resetIn,
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.resetIn),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimitResult.resetIn),
          },
        }
      );
    }

    // Parse the request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Type check the body
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Request body must be an object' },
        { status: 400 }
      );
    }

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
    } = body as Record<string, unknown>;

    // Prepare form data for validation
    const formData: QuoteFormData = {
      firstName: typeof firstName === 'string' ? firstName : '',
      lastName: typeof lastName === 'string' ? lastName : '',
      email: typeof email === 'string' ? email : '',
      phone: typeof phone === 'string' ? phone : '',
      country: typeof country === 'string' ? country : '',
      city: typeof city === 'string' ? city : '',
      zipcode: typeof zipcode === 'string' ? zipcode : '',
      productType: typeof productType === 'string' ? productType : '',
      subProductType: typeof subProductType === 'string' ? subProductType : '',
      message: typeof message === 'string' ? message : '',
    };

    // Server-side validation (mirrors client-side)
    const validationErrors = validateQuoteForm(formData);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // Sanitize data
    const sanitizedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      country: formData.country.trim(),
      city: formData.city.trim(),
      zipcode: formData.zipcode.trim(),
      productType: formData.productType.trim(),
      subProductType: formData.subProductType.trim(),
      message: formData.message.trim(),
    };

    // Validate API key
    const apiKey = process.env.MAILERSEND_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here' || apiKey === 'your_actual_api_key_here') {
      console.error('MailerSend API key not configured');
      return NextResponse.json(
        { error: 'Email service is temporarily unavailable' },
        { status: 503 }
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

    // Escape user input for HTML email (XSS prevention)
    const safeFirstName = escapeHtml(sanitizedData.firstName);
    const safeLastName = escapeHtml(sanitizedData.lastName);
    const safeEmail = escapeHtml(sanitizedData.email);
    const safePhone = escapeHtml(sanitizedData.phone);
    const safeCountry = escapeHtml(sanitizedData.country);
    const safeCity = escapeHtml(sanitizedData.city);
    const safeZipcode = escapeHtml(sanitizedData.zipcode);
    const safeProductType = escapeHtml(sanitizedData.productType);
    const safeSubProductType = escapeHtml(sanitizedData.subProductType);
    const safeMessage = escapeHtmlWithLineBreaks(sanitizedData.message);

    // Create email content with escaped values
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo({ email: sanitizedData.email, name: `${sanitizedData.firstName} ${sanitizedData.lastName}` })
      .setSubject(`New Quote Request: ${sanitizedData.productType} - ${sanitizedData.subProductType}`)
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
                    <div class="value">${safeFirstName} ${safeLastName}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value"><a href="tel:${safePhone}">${safePhone}</a></div>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">Location</div>
                  <div class="field">
                    <div class="label">Country:</div>
                    <div class="value">${safeCountry}</div>
                  </div>
                  <div class="field">
                    <div class="label">City:</div>
                    <div class="value">${safeCity}</div>
                  </div>
                  <div class="field">
                    <div class="label">Zipcode:</div>
                    <div class="value">${safeZipcode}</div>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">Product Interest</div>
                  <div class="field">
                    <div class="label">Product Type:</div>
                    <div class="value"><strong>${safeProductType}</strong></div>
                  </div>
                  <div class="field">
                    <div class="label">Sub Product Type:</div>
                    <div class="value"><strong>${safeSubProductType}</strong></div>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">Customer Message</div>
                  <div class="message-box">${safeMessage}</div>
                </div>

                <div class="footer">
                  <p><strong>This is a quote request from the IEMT Lab website</strong></p>
                  <p>Please respond within 24 hours</p>
                  <p>Reply directly to this email to respond to ${safeFirstName}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `)
      .setText(`
        New Quote Request
        
        Product: ${sanitizedData.productType} - ${sanitizedData.subProductType}
        
        CUSTOMER INFORMATION
        Name: ${sanitizedData.firstName} ${sanitizedData.lastName}
        Email: ${sanitizedData.email}
        Phone: ${sanitizedData.phone}
        
        LOCATION
        Country: ${sanitizedData.country}
        City: ${sanitizedData.city}
        Zipcode: ${sanitizedData.zipcode}
        
        MESSAGE
        ${sanitizedData.message}
        
        ---
        This is a quote request from the IEMT Lab website
        Please respond within 24 hours
      `);

    // Send the email
    await mailerSend.email.send(emailParams);

    return NextResponse.json(
      { success: true, message: 'Quote request sent successfully' },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error: unknown) {
    // Log the full error server-side for debugging
    console.error('Error sending quote email:', error);
    
    // Return generic error to client (don't expose implementation details)
    return NextResponse.json(
      { error: 'Failed to send quote request. Please try again later.' },
      { status: 500 }
    );
  }
}

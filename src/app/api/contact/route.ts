import { NextRequest, NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import {
  validateContactForm,
  escapeHtml,
  escapeHtmlWithLineBreaks,
  checkRateLimit,
  getClientIp,
  type ContactFormData,
} from '@/lib/validation';

// Initialize MailerSend client
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

// Rate limit configuration
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests
const RATE_LIMIT_WINDOW_MS = 60000; // per minute

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request.headers);
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(
      `contact:${clientIp}`,
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

    const { firstName, lastName, email, message } = body as Record<string, unknown>;

    // Prepare form data for validation
    const formData: ContactFormData = {
      firstName: typeof firstName === 'string' ? firstName : '',
      lastName: typeof lastName === 'string' ? lastName : '',
      email: typeof email === 'string' ? email : '',
      message: typeof message === 'string' ? message : '',
    };

    // Server-side validation (mirrors client-side)
    const validationErrors = validateContactForm(formData);
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
        'IEMT Lab Team'
      ),
    ];

    // Escape user input for HTML email (XSS prevention)
    const safeFirstName = escapeHtml(sanitizedData.firstName);
    const safeLastName = escapeHtml(sanitizedData.lastName);
    const safeEmail = escapeHtml(sanitizedData.email);
    const safeMessage = escapeHtmlWithLineBreaks(sanitizedData.message);

    // Create email content with escaped values
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo({ email: sanitizedData.email, name: `${sanitizedData.firstName} ${sanitizedData.lastName}` })
      .setSubject(`New Contact Form Submission from ${sanitizedData.firstName} ${sanitizedData.lastName}`)
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
                  <div class="value">${safeFirstName} ${safeLastName}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${safeMessage}</div>
                </div>
                <div class="footer">
                  <p>This email was sent from the IEMT Lab contact form</p>
                  <p>Reply directly to this email to respond to ${safeFirstName}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `)
      .setText(`
        New Contact Form Submission
        
        From: ${sanitizedData.firstName} ${sanitizedData.lastName}
        Email: ${sanitizedData.email}
        
        Message:
        ${sanitizedData.message}
        
        ---
        This email was sent from the IEMT Lab contact form
      `);

    // Send the email
    await mailerSend.email.send(emailParams);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error: unknown) {
    // Log the full error server-side for debugging
    console.error('Error sending email:', error);
    
    // Return generic error to client (don't expose implementation details)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

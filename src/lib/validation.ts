/**
 * Shared validation utilities for forms
 * Used by both client-side components and server-side API routes
 */

// =============================================================================
// SECURITY UTILITIES
// =============================================================================

/**
 * Escapes HTML entities to prevent XSS attacks
 * Use this when interpolating user input into HTML templates
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Escapes HTML and converts newlines to <br> tags
 * Safe for use in HTML email templates
 */
export function escapeHtmlWithLineBreaks(str: string): string {
  return escapeHtml(str).replace(/\n/g, '<br>');
}

// =============================================================================
// VALIDATION PATTERNS
// =============================================================================

/**
 * Email validation regex
 * - Requires at least 2 chars before @
 * - Requires valid domain structure
 * - Requires TLD of at least 2 chars
 * Note: Hyphens are escaped for HTML5 pattern attribute compatibility (v flag)
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]{2,}@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

/**
 * Phone validation regex
 * - Allows international formats
 * - Requires at least 7 digits total
 * - Allows spaces, dashes, and dots
 * Note: Simplified for HTML5 pattern attribute compatibility (v flag)
 */
export const PHONE_REGEX = /^[+0-9][0-9 .\-]{6,}$/;

/**
 * Name validation - allows letters, spaces, hyphens, and apostrophes
 * Supports international characters
 */
export const NAME_REGEX = /^[\p{L}\s'-]+$/u;

// =============================================================================
// VALIDATION CONSTANTS
// =============================================================================

export const VALIDATION_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 5000,
  ZIPCODE_MIN_LENGTH: 2,
  ZIPCODE_MAX_LENGTH: 20,
  CITY_MIN_LENGTH: 2,
  CITY_MAX_LENGTH: 100,
  COUNTRY_MIN_LENGTH: 2,
  COUNTRY_MAX_LENGTH: 100,
} as const;

// =============================================================================
// VALIDATION ERROR TYPE
// =============================================================================

export interface ValidationError {
  field: string;
  message: string;
}

// =============================================================================
// CONTACT FORM VALIDATION
// =============================================================================

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate first name
  const firstName = (data.firstName || '').trim();
  if (!firstName) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  } else if (firstName.length < VALIDATION_LIMITS.NAME_MIN_LENGTH) {
    errors.push({ field: 'firstName', message: `First name must be at least ${VALIDATION_LIMITS.NAME_MIN_LENGTH} characters` });
  } else if (firstName.length > VALIDATION_LIMITS.NAME_MAX_LENGTH) {
    errors.push({ field: 'firstName', message: `First name must be less than ${VALIDATION_LIMITS.NAME_MAX_LENGTH} characters` });
  } else if (!NAME_REGEX.test(firstName)) {
    errors.push({ field: 'firstName', message: 'First name contains invalid characters' });
  }

  // Validate last name
  const lastName = (data.lastName || '').trim();
  if (!lastName) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  } else if (lastName.length < VALIDATION_LIMITS.NAME_MIN_LENGTH) {
    errors.push({ field: 'lastName', message: `Last name must be at least ${VALIDATION_LIMITS.NAME_MIN_LENGTH} characters` });
  } else if (lastName.length > VALIDATION_LIMITS.NAME_MAX_LENGTH) {
    errors.push({ field: 'lastName', message: `Last name must be less than ${VALIDATION_LIMITS.NAME_MAX_LENGTH} characters` });
  } else if (!NAME_REGEX.test(lastName)) {
    errors.push({ field: 'lastName', message: 'Last name contains invalid characters' });
  }

  // Validate email
  const email = (data.email || '').trim();
  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Validate message
  const message = (data.message || '').trim();
  if (!message) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (message.length < VALIDATION_LIMITS.MESSAGE_MIN_LENGTH) {
    errors.push({ field: 'message', message: `Message must be at least ${VALIDATION_LIMITS.MESSAGE_MIN_LENGTH} characters` });
  } else if (message.length > VALIDATION_LIMITS.MESSAGE_MAX_LENGTH) {
    errors.push({ field: 'message', message: `Message must be less than ${VALIDATION_LIMITS.MESSAGE_MAX_LENGTH} characters` });
  }

  return errors;
}

// =============================================================================
// QUOTE FORM VALIDATION
// =============================================================================

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zipcode: string;
  productType: string;
  subProductType: string;
  message: string;
}

// Valid product types and their sub-products
export const VALID_PRODUCT_TYPES = {
  "Electric ATV": ["EonTrail", "HyperGlide", "TitanVolt"],
  "Enhanced Kango ZE": ["Standard Enhancement", "Performance Package", "Extended Range"],
  "Converted Vehicle": ["Car Conversion", "Van Conversion", "Bus Conversion"],
} as const;

export type ProductType = keyof typeof VALID_PRODUCT_TYPES;

export function isValidProductType(productType: string): productType is ProductType {
  return productType in VALID_PRODUCT_TYPES;
}

export function isValidSubProductType(productType: string, subProductType: string): boolean {
  if (!isValidProductType(productType)) return false;
  return (VALID_PRODUCT_TYPES[productType] as readonly string[]).includes(subProductType);
}

export function validateQuoteForm(data: QuoteFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate first name
  const firstName = (data.firstName || '').trim();
  if (!firstName) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  } else if (firstName.length < VALIDATION_LIMITS.NAME_MIN_LENGTH) {
    errors.push({ field: 'firstName', message: `First name must be at least ${VALIDATION_LIMITS.NAME_MIN_LENGTH} characters` });
  } else if (firstName.length > VALIDATION_LIMITS.NAME_MAX_LENGTH) {
    errors.push({ field: 'firstName', message: `First name must be less than ${VALIDATION_LIMITS.NAME_MAX_LENGTH} characters` });
  } else if (!NAME_REGEX.test(firstName)) {
    errors.push({ field: 'firstName', message: 'First name contains invalid characters' });
  }

  // Validate last name
  const lastName = (data.lastName || '').trim();
  if (!lastName) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  } else if (lastName.length < VALIDATION_LIMITS.NAME_MIN_LENGTH) {
    errors.push({ field: 'lastName', message: `Last name must be at least ${VALIDATION_LIMITS.NAME_MIN_LENGTH} characters` });
  } else if (lastName.length > VALIDATION_LIMITS.NAME_MAX_LENGTH) {
    errors.push({ field: 'lastName', message: `Last name must be less than ${VALIDATION_LIMITS.NAME_MAX_LENGTH} characters` });
  } else if (!NAME_REGEX.test(lastName)) {
    errors.push({ field: 'lastName', message: 'Last name contains invalid characters' });
  }

  // Validate email
  const email = (data.email || '').trim();
  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Validate phone
  const phone = (data.phone || '').trim();
  if (!phone) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!PHONE_REGEX.test(phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
  }

  // Validate country
  const country = (data.country || '').trim();
  if (!country) {
    errors.push({ field: 'country', message: 'Country is required' });
  } else if (country.length < VALIDATION_LIMITS.COUNTRY_MIN_LENGTH) {
    errors.push({ field: 'country', message: `Country must be at least ${VALIDATION_LIMITS.COUNTRY_MIN_LENGTH} characters` });
  } else if (country.length > VALIDATION_LIMITS.COUNTRY_MAX_LENGTH) {
    errors.push({ field: 'country', message: `Country must be less than ${VALIDATION_LIMITS.COUNTRY_MAX_LENGTH} characters` });
  }

  // Validate city
  const city = (data.city || '').trim();
  if (!city) {
    errors.push({ field: 'city', message: 'City is required' });
  } else if (city.length < VALIDATION_LIMITS.CITY_MIN_LENGTH) {
    errors.push({ field: 'city', message: `City must be at least ${VALIDATION_LIMITS.CITY_MIN_LENGTH} characters` });
  } else if (city.length > VALIDATION_LIMITS.CITY_MAX_LENGTH) {
    errors.push({ field: 'city', message: `City must be less than ${VALIDATION_LIMITS.CITY_MAX_LENGTH} characters` });
  }

  // Validate zipcode
  const zipcode = (data.zipcode || '').trim();
  if (!zipcode) {
    errors.push({ field: 'zipcode', message: 'Zipcode is required' });
  } else if (zipcode.length < VALIDATION_LIMITS.ZIPCODE_MIN_LENGTH) {
    errors.push({ field: 'zipcode', message: `Zipcode must be at least ${VALIDATION_LIMITS.ZIPCODE_MIN_LENGTH} characters` });
  } else if (zipcode.length > VALIDATION_LIMITS.ZIPCODE_MAX_LENGTH) {
    errors.push({ field: 'zipcode', message: `Zipcode must be less than ${VALIDATION_LIMITS.ZIPCODE_MAX_LENGTH} characters` });
  }

  // Validate product type
  const productType = (data.productType || '').trim();
  if (!productType) {
    errors.push({ field: 'productType', message: 'Please select a product type' });
  } else if (!isValidProductType(productType)) {
    errors.push({ field: 'productType', message: 'Please select a valid product type' });
  }

  // Validate sub-product type
  const subProductType = (data.subProductType || '').trim();
  if (!subProductType) {
    errors.push({ field: 'subProductType', message: 'Please select a sub product type' });
  } else if (productType && !isValidSubProductType(productType, subProductType)) {
    errors.push({ field: 'subProductType', message: 'Please select a valid sub product type for the selected product' });
  }

  // Validate message
  const message = (data.message || '').trim();
  if (!message) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (message.length < VALIDATION_LIMITS.MESSAGE_MIN_LENGTH) {
    errors.push({ field: 'message', message: `Message must be at least ${VALIDATION_LIMITS.MESSAGE_MIN_LENGTH} characters` });
  } else if (message.length > VALIDATION_LIMITS.MESSAGE_MAX_LENGTH) {
    errors.push({ field: 'message', message: `Message must be less than ${VALIDATION_LIMITS.MESSAGE_MAX_LENGTH} characters` });
  }

  return errors;
}

// =============================================================================
// RATE LIMITING UTILITY
// =============================================================================

/**
 * Simple in-memory rate limiter for serverless functions
 * Note: This resets on each cold start. For production, use Redis or similar.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds until reset
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000 // 1 minute
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    // First request or window expired
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetIn: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxRequests) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  // Increment count
  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetIn: Math.ceil((record.resetTime - now) / 1000),
  };
}

/**
 * Get client IP from request headers
 * Works with Netlify, Vercel, and direct connections
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') || // Cloudflare
    'unknown'
  );
}

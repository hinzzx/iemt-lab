"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  validateQuoteForm,
  EMAIL_REGEX,
  PHONE_REGEX,
  VALIDATION_LIMITS,
  VALID_PRODUCT_TYPES,
  type QuoteFormData,
  type ProductType,
} from "@/lib/validation";

// Timeout for fetch requests (30 seconds)
const FETCH_TIMEOUT_MS = 30000;

// Product type to sub-products mapping for the dropdown
const PRODUCT_SUB_PRODUCTS: Record<ProductType, { value: string; label: string }[]> = {
  "Electric ATV": [
    { value: "EonTrail", label: "EonTrail" },
    { value: "HyperGlide", label: "HyperGlide" },
    { value: "TitanVolt", label: "TitanVolt" },
  ],
  "Enhanced Kango ZE": [
    { value: "Standard Enhancement", label: "Standard Enhancement" },
    { value: "Performance Package", label: "Performance Package" },
    { value: "Extended Range", label: "Extended Range" },
  ],
  "Converted Vehicle": [
    { value: "Car Conversion", label: "Car Conversion" },
    { value: "Van Conversion", label: "Van Conversion" },
    { value: "Bus Conversion", label: "Bus Conversion" },
  ],
};

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');
  
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors))
    .filter(el => el.offsetParent !== null); // Filter out hidden elements
}

export function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductType, setSelectedProductType] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isSubmittingRef = useRef(false); // Atomic lock for double-submit prevention
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Get available sub-products based on selected product type
  const availableSubProducts = selectedProductType && selectedProductType in PRODUCT_SUB_PRODUCTS
    ? PRODUCT_SUB_PRODUCTS[selectedProductType as ProductType]
    : [];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Focus management: save previous focus, set focus on open, restore on close
  useEffect(() => {
    if (isOpen) {
      // Save the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal container (or first focusable element) after a brief delay
      // to ensure the modal is fully rendered
      const focusTimeout = setTimeout(() => {
        if (modalRef.current) {
          const focusableElements = getFocusableElements(modalRef.current);
          if (focusableElements.length > 0) {
            // Focus the close button first (it's the most logical first element)
            focusableElements[0]?.focus();
          } else {
            modalRef.current.focus();
          }
        }
      }, 50);

      return () => clearTimeout(focusTimeout);
    } else {
      // Restore focus when modal closes
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Focus trap: keep focus within modal when open
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = getFocusableElements(modalRef.current);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: going backwards
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab: going forwards
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isSubmitting, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Abort any in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Clear timeout if modal closes while timeout is pending
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // Use setTimeout to defer state reset to avoid setState during render
      const resetTimeout = setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        setError(null);
        setSelectedProductType("");
        isSubmittingRef.current = false;
      }, 0);
      
      return () => clearTimeout(resetTimeout);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Atomic double-submit prevention
    if (isSubmittingRef.current) {
      return;
    }
    isSubmittingRef.current = true;
    
    // Abort any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    // Set up timeout
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, FETCH_TIMEOUT_MS);

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Check honeypot field for spam protection
      const honeypot = formData.get("website");
      if (honeypot) {
        // Silently fail for bots
        setIsSubmitting(false);
        setIsSubmitted(true);
        isSubmittingRef.current = false;
        clearTimeout(timeoutId);
        return;
      }
      
      const rawData: QuoteFormData = {
        firstName: (formData.get("firstName") as string) || "",
        lastName: (formData.get("lastName") as string) || "",
        email: (formData.get("email") as string) || "",
        phone: (formData.get("phone") as string) || "",
        country: (formData.get("country") as string) || "",
        city: (formData.get("city") as string) || "",
        zipcode: (formData.get("zipcode") as string) || "",
        productType: (formData.get("productType") as string) || "",
        subProductType: (formData.get("subProductType") as string) || "",
        message: (formData.get("message") as string) || "",
      };
      
      // Client-side validation using shared validation
      const validationErrors = validateQuoteForm(rawData);
      if (validationErrors.length > 0) {
        setError(validationErrors.map(e => e.message).join(". "));
        setIsSubmitting(false);
        isSubmittingRef.current = false;
        clearTimeout(timeoutId);
        return;
      }
      
      // Sanitize data (trim whitespace)
      const data = {
        firstName: rawData.firstName.trim(),
        lastName: rawData.lastName.trim(),
        email: rawData.email.trim().toLowerCase(),
        phone: rawData.phone.trim(),
        country: rawData.country.trim(),
        city: rawData.city.trim(),
        zipcode: rawData.zipcode.trim(),
        productType: rawData.productType,
        subProductType: rawData.subProductType,
        message: rawData.message.trim(),
      };

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: abortController.signal,
      });

      clearTimeout(timeoutId);

      const result = await response.json();

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = result.retryAfter || 60;
          throw new Error(`Too many requests. Please try again in ${retryAfter} seconds.`);
        }
        throw new Error(result.error || "Failed to send quote request");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Don't reset form immediately - let user see what they submitted
      // Form will reset when modal closes

      // Clear any existing timeout before setting new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Close modal after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      clearTimeout(timeoutId);
      
      // Don't update state if request was aborted (component unmounting)
      if (err instanceof Error && err.name === 'AbortError') {
        // Check if it was a timeout vs user-initiated abort
        if (abortControllerRef.current === abortController) {
          setError("Request timed out. Please check your connection and try again.");
          setIsSubmitting(false);
        }
        isSubmittingRef.current = false;
        return;
      }

      console.error("Error submitting quote:", err);
      setIsSubmitting(false);
      
      // Differentiate error types
      if (err instanceof TypeError) {
        setError("Network error. Please check your connection and try again.");
      } else if (err instanceof Error) {
        setError(err.message || "Failed to send quote request. Please try again.");
      } else {
        setError("Failed to send quote request. Please try again or contact us directly.");
      }
    } finally {
      isSubmittingRef.current = false;
    }
  }, [onClose]);

  // Handle product type change
  const handleProductTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductType(e.target.value);
    // Reset sub-product when product type changes
    const subProductSelect = formRef.current?.querySelector<HTMLSelectElement>('[name="subProductType"]');
    if (subProductSelect) {
      subProductSelect.value = "";
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "modal-overlay",
        isOpen && "open"
      )}
      onClick={(e) => {
        // Don't close if submitting
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div 
        ref={modalRef}
        className="modal-content"
        tabIndex={-1}
      >
        {/* Close button - Fixed at top when scrolling */}
        <div className="sticky top-0 z-20 flex justify-end p-4 bg-gradient-to-b from-navy-800 via-navy-800 to-transparent pointer-events-none">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-lg bg-navy-700/95 border border-ice-300/20 text-ice-300 hover:text-ice-100 hover:bg-navy-700 transition-colors shadow-lg pointer-events-auto",
              isSubmitting && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 pb-8 -mt-6">
          <div className="mb-8">
            <h2 id="quote-modal-title" className="text-3xl font-bold text-ice-100 mb-2">Get a Quote</h2>
            <p className="text-ice-400">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
          </div>

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center" role="status" aria-live="polite">
              <div className="w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-eco/20 to-eco/5 flex items-center justify-center">
                <svg className="w-10 h-10 text-eco" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-ice-100 mb-3">Request Sent!</h3>
              <p className="text-ice-400 max-w-sm">Thank you for your quote request. Our team will review your information and get back to you within 24 hours.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Inline error message */}
              {error && (
                <div 
                  role="alert" 
                  aria-live="polite"
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Honeypot field for spam protection - hidden from real users */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              />

              {/* Name fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  id="quote-firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  required
                  disabled={isSubmitting}
                  autoComplete="given-name"
                  minLength={VALIDATION_LIMITS.NAME_MIN_LENGTH}
                  maxLength={VALIDATION_LIMITS.NAME_MAX_LENGTH}
                />
                <Input
                  id="quote-lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  required
                  disabled={isSubmitting}
                  autoComplete="family-name"
                  minLength={VALIDATION_LIMITS.NAME_MIN_LENGTH}
                  maxLength={VALIDATION_LIMITS.NAME_MAX_LENGTH}
                />
              </div>

              {/* Contact fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  id="quote-email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="john@example.com"
                  required
                  disabled={isSubmitting}
                  autoComplete="email"
                  pattern={EMAIL_REGEX.source}
                />
                <Input
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  label="Phone"
                  placeholder="+1 234 567 8900"
                  required
                  disabled={isSubmitting}
                  autoComplete="tel"
                  pattern={PHONE_REGEX.source}
                />
              </div>

              {/* Location fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Input
                  id="quote-country"
                  name="country"
                  label="Country"
                  placeholder="United States"
                  required
                  disabled={isSubmitting}
                  autoComplete="country-name"
                  minLength={VALIDATION_LIMITS.COUNTRY_MIN_LENGTH}
                  maxLength={VALIDATION_LIMITS.COUNTRY_MAX_LENGTH}
                />
                <Input
                  id="quote-city"
                  name="city"
                  label="City"
                  placeholder="New York"
                  required
                  disabled={isSubmitting}
                  autoComplete="address-level2"
                  minLength={VALIDATION_LIMITS.CITY_MIN_LENGTH}
                  maxLength={VALIDATION_LIMITS.CITY_MAX_LENGTH}
                />
                <Input
                  id="quote-zipcode"
                  name="zipcode"
                  label="Zipcode"
                  placeholder="10001"
                  required
                  disabled={isSubmitting}
                  autoComplete="postal-code"
                  minLength={VALIDATION_LIMITS.ZIPCODE_MIN_LENGTH}
                  maxLength={VALIDATION_LIMITS.ZIPCODE_MAX_LENGTH}
                />
              </div>

              {/* Product selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="w-full group">
                  <label 
                    htmlFor="quote-productType" 
                    className="block text-sm font-medium text-ice-300 mb-2.5 transition-colors duration-200 group-focus-within:text-amber-400"
                  >
                    Product Type / Service
                  </label>
                  <select
                    id="quote-productType"
                    name="productType"
                    required
                    disabled={isSubmitting}
                    value={selectedProductType}
                    onChange={handleProductTypeChange}
                    className={cn(
                      "w-full h-12 px-4 py-3 rounded border border-navy-600/50 bg-navy-800/40 text-base text-ice-100",
                      "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      "focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20",
                      "hover:border-navy-500 hover:bg-navy-800/60",
                      "disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                  >
                    <option value="">Select a product type</option>
                    {Object.keys(VALID_PRODUCT_TYPES).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full group">
                  <label 
                    htmlFor="quote-subProductType" 
                    className="block text-sm font-medium text-ice-300 mb-2.5 transition-colors duration-200 group-focus-within:text-amber-400"
                  >
                    Sub Product Type
                  </label>
                  <select
                    id="quote-subProductType"
                    name="subProductType"
                    required
                    disabled={isSubmitting || !selectedProductType}
                    className={cn(
                      "w-full h-12 px-4 py-3 rounded border border-navy-600/50 bg-navy-800/40 text-base text-ice-100",
                      "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      "focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20",
                      "hover:border-navy-500 hover:bg-navy-800/60",
                      "disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                  >
                    <option value="">
                      {selectedProductType ? "Select a sub product type" : "Select product type first"}
                    </option>
                    {availableSubProducts.map((subProduct) => (
                      <option key={subProduct.value} value={subProduct.value}>
                        {subProduct.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <Textarea
                id="quote-message"
                name="message"
                label="Message to Us"
                placeholder="Tell us about your requirements, questions, or any specific details..."
                required
                disabled={isSubmitting}
                rows={5}
                minLength={VALIDATION_LIMITS.MESSAGE_MIN_LENGTH}
                maxLength={VALIDATION_LIMITS.MESSAGE_MAX_LENGTH}
              />

              {/* Submit button */}
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full hover-icon-shift press-effect"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Quote Request"}
                {!isSubmitting && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

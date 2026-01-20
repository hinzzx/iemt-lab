"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeouts when modal closes or unmounts
  useEffect(() => {
    // Cleanup function for timeouts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Reset state when modal closes (separate effect to avoid setState in render)
  useEffect(() => {
    if (!isOpen) {
      // Clear timeout if modal closes while timeout is pending
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // Use setTimeout to defer state reset to avoid setState during render
      const resetTimeout = setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
      }, 0);
      
      return () => clearTimeout(resetTimeout);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        country: formData.get("country"),
        city: formData.get("city"),
        zipcode: formData.get("zipcode"),
        productType: formData.get("productType"),
        subProductType: formData.get("subProductType"),
        message: formData.get("message"),
      };

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send quote request");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form
      e.currentTarget.reset();

      // Close modal after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting quote:", error);
      setIsSubmitting(false);
      alert("Failed to send quote request. Please try again or contact us directly.");
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "modal-overlay",
        isOpen && "open"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        {/* Close button - Fixed at top when scrolling */}
        <div className="sticky top-0 z-20 flex justify-end p-4 bg-gradient-to-b from-navy-800 via-navy-800 to-transparent pointer-events-none">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-navy-700/95 border border-ice-300/20 text-ice-300 hover:text-ice-100 hover:bg-navy-700 transition-colors shadow-lg pointer-events-auto"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 pb-8 -mt-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-ice-100 mb-2">Get a Quote</h2>
            <p className="text-ice-400">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
          </div>

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-eco/20 to-eco/5 flex items-center justify-center">
                <svg className="w-10 h-10 text-eco" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-ice-100 mb-3">Request Sent!</h3>
              <p className="text-ice-400 max-w-sm">Thank you for your quote request. Our team will review your information and get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  required
                />
                <Input
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  required
                />
              </div>

              {/* Contact fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="john@example.com"
                  required
                />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Phone"
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>

              {/* Location fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Input
                  id="country"
                  name="country"
                  label="Country"
                  placeholder="United States"
                  required
                />
                <Input
                  id="city"
                  name="city"
                  label="City"
                  placeholder="New York"
                  required
                />
                <Input
                  id="zipcode"
                  name="zipcode"
                  label="Zipcode"
                  placeholder="10001"
                  required
                />
              </div>

              {/* Product selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="productType" className="block text-sm font-medium text-ice-300 mb-2">
                    Product Type / Service
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    required
                    className="w-full px-4 py-3 bg-navy-700/80 border border-ice-300/20 rounded-lg text-ice-100 placeholder-ice-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                  >
                    <option value="">Select a product type</option>
                    <option value="Electric ATV">Electric ATV</option>
                    <option value="Enhanced Kango ZE">Enhanced Kango ZE</option>
                    <option value="Converted Vehicle">Converted Vehicle</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subProductType" className="block text-sm font-medium text-ice-300 mb-2">
                    Sub Product Type
                  </label>
                  <select
                    id="subProductType"
                    name="subProductType"
                    required
                    className="w-full px-4 py-3 bg-navy-700/80 border border-ice-300/20 rounded-lg text-ice-100 placeholder-ice-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                  >
                    <option value="">Select a sub product type</option>
                    <option value="EonTrail">EonTrail</option>
                    <option value="HyperGlide">HyperGlide</option>
                    <option value="TitanVolt">TitanVolt</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <Textarea
                id="message"
                name="message"
                label="Message to Us"
                placeholder="Tell us about your requirements, questions, or any specific details..."
                required
                rows={5}
              />

              {/* Submit button */}
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full hover-icon-shift press-effect"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Preparing..." : "Send Message"}
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

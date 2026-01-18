"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Animated } from "@/components/ui/animated";

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "Karlovo, Bulgaria",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+359 89 354 2287",
    href: "tel:+359893542287",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "contact@iemt-lab.com",
    href: "mailto:contact@iemt-lab.com",
  },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with cleanup
    await new Promise(resolve => {
      timeoutRef.current = setTimeout(resolve, 1500);
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds with cleanup
    timeoutRef.current = setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <Section id="contact" variant="default">
      <SectionHeader
        badge="Get In Touch"
        title="Contact Us"
        subtitle="Ready to electrify your vehicle or have questions about our services? We'd love to hear from you."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Contact Form - Optimized */}
        <Animated animation="slide-up" duration={700} distance={50} className="order-2 lg:order-1">
          <div className="relative bg-navy-700/65 border border-ice-300/20 rounded-xl p-8 overflow-hidden shadow-lg shadow-navy-900/30">
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/[0.03] to-transparent rounded-bl-full pointer-events-none" />
            
            {isSubmitted ? (
              <Animated animation="fade" duration={400}>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-eco/20 to-eco/5 flex items-center justify-center">
                    <svg className="w-10 h-10 text-eco" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-ice-100 mb-3">Message Sent!</h3>
                  <p className="text-ice-400 max-w-sm">Thanks for reaching out. We&apos;ll get back to you as soon as possible.</p>
                </div>
              </Animated>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    id="firstName"
                    label="First Name"
                    placeholder="John"
                    required
                  />
                  <Input
                    id="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    required
                  />
                </div>

                <Input
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="john@example.com"
                  required
                />

                <Textarea
                  id="message"
                  label="Message"
                  placeholder="Tell us about your project or inquiry..."
                  required
                />

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full hover-icon-shift press-effect"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </Button>
              </form>
            )}
          </div>
        </Animated>

        {/* Contact Info - Streamlined */}
        <Animated animation="slide-up" duration={700} distance={50} delay={100} className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-32">
            <h3 className="text-2xl font-semibold text-ice-100 mb-3">
              Let&apos;s Talk
            </h3>
            <p className="text-ice-400 mb-10 leading-relaxed">
              Whether you&apos;re looking to convert your vehicle to electric, upgrade your EV&apos;s performance, or simply want to learn more about our solutions, our team is here to help.
            </p>

            {/* Contact Cards - Cleaner */}
            <div className="space-y-4 mb-12">
              {contactInfo.map((info, index) => (
                <Animated
                  key={info.label}
                  animation="slide-up"
                  delay={200 + index * 80}
                  duration={600}
                  distance={30}
                >
                  <div className="group flex items-center gap-5 p-5 rounded-xl bg-navy-700/65 border border-ice-300/20 transition-[background-color,border-color] duration-200 hover:bg-navy-700/80 hover:border-ice-300/30 hover-lift shadow-lg shadow-navy-900/25">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:from-amber-500/25 group-hover:border-amber-500/30 transition-[transform,background-image,border-color] duration-200">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-ice-400/80 mb-1 uppercase tracking-wider">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-ice-100 font-medium hover:text-amber-400 transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-ice-100 font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                </Animated>
              ))}
            </div>

            {/* Map Placeholder - Optimized with Next.js Image */}
            <Animated animation="fade" delay={450} duration={600}>
              <div className="relative h-64 rounded-xl overflow-hidden bg-navy-700/60 border border-ice-300/20 group shadow-lg shadow-navy-900/25">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                  alt="Karlovo, Bulgaria map location"
                  fill
                  className="object-cover opacity-40 transition-[transform,opacity] duration-400 group-hover:opacity-50 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={60}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center accent-amber group-hover:scale-105 transition-transform duration-200">
                      <svg className="w-7 h-7 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-ice-100 font-medium text-lg">Karlovo, Bulgaria</p>
                    <p className="text-ice-400 text-sm mt-1">Visit our facility</p>
                  </div>
                </div>
              </div>
            </Animated>
          </div>
        </Animated>
      </div>
    </Section>
  );
}

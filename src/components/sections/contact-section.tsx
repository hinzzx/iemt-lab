"use client";

import { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <Section id="contact" variant="default">
      <SectionHeader
        badge="Get In Touch"
        title="Contact Us"
        subtitle="Ready to electrify your vehicle or have questions about our services? We'd love to hear from you."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Contact Form */}
        <Animated animation="slide-right" duration={1000} distance={80} className="order-2 lg:order-1">
          <div className="relative bg-neutral-800/15 border border-neutral-700/20 rounded-2xl p-8 backdrop-blur-sm overflow-hidden">
            {/* Decorative corner gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-bl-full pointer-events-none" />
            
            {isSubmitted ? (
              <Animated animation="zoom-in" duration={600}>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-green-500/15 to-green-500/5 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-neutral-400 max-w-sm">Thanks for reaching out. We&apos;ll get back to you as soon as possible.</p>
                </div>
              </Animated>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Animated animation="slide-up" delay={100} duration={800} distance={40}>
                    <Input
                      id="firstName"
                      label="First Name"
                      placeholder="John"
                      required
                    />
                  </Animated>
                  <Animated animation="slide-up" delay={180} duration={800} distance={40}>
                    <Input
                      id="lastName"
                      label="Last Name"
                      placeholder="Doe"
                      required
                    />
                  </Animated>
                </div>

                <Animated animation="slide-up" delay={260} duration={800} distance={40}>
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="john@example.com"
                    required
                  />
                </Animated>

                <Animated animation="slide-up" delay={340} duration={800} distance={40}>
                  <Textarea
                    id="message"
                    label="Message"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  />
                </Animated>

                <Animated animation="slide-up" delay={420} duration={800} distance={40}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full hover-icon-shift"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </Button>
                </Animated>
              </form>
            )}
          </div>
        </Animated>

        {/* Contact Info */}
        <Animated animation="slide-left" duration={1000} distance={80} className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-32">
            <Animated animation="slide-up" delay={100} duration={900} distance={50}>
              <h3 className="text-2xl font-bold text-white mb-3">
                Let&apos;s Talk
              </h3>
            </Animated>
            <Animated animation="slide-up" delay={180} duration={900} distance={40}>
              <p className="text-neutral-400 mb-10 leading-relaxed">
                Whether you&apos;re looking to convert your vehicle to electric, upgrade your EV&apos;s performance, or simply want to learn more about our solutions, our team is here to help.
              </p>
            </Animated>

            {/* Contact Cards */}
            <div className="space-y-4 mb-12">
              {contactInfo.map((info, index) => (
                <Animated
                  key={info.label}
                  animation="flip-left"
                  delay={250 + index * 120}
                  duration={900}
                  distance={60}
                >
                  <div className="group flex items-center gap-5 p-5 rounded-xl bg-neutral-800/15 border border-neutral-700/20 backdrop-blur-sm transition-all duration-400 hover:bg-neutral-800/30 hover:border-primary-500/20 hover-lift">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/15 to-primary-500/5 flex items-center justify-center text-primary-400 group-hover:scale-105 group-hover:from-primary-500/25 transition-all duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1 uppercase tracking-wider">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white font-medium hover:text-primary-400 transition-colors duration-200 link-underline"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                </Animated>
              ))}
            </div>

            {/* Map Placeholder */}
            <Animated animation="zoom-in" delay={600} duration={1000}>
              <div className="relative h-64 rounded-2xl overflow-hidden bg-neutral-800/20 border border-neutral-700/20 group">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium text-lg">Karlovo, Bulgaria</p>
                    <p className="text-neutral-400 text-sm mt-1">Visit our facility</p>
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

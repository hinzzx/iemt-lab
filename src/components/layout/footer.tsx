"use client";

import { Animated } from "@/components/ui/animated";

const footerLinks = {
  main: [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
  products: [
    { name: "Electric ATV", href: "#products" },
    { name: "KangoZE Enhanced", href: "#products" },
    { name: "Converted Vehicles", href: "#products" },
  ],
  legal: [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative bg-neutral-950 border-t border-neutral-800/40 overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-secondary-500/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <Animated animation="slide-up" duration={1000} distance={50} className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-400" />
                <div className="relative bg-neutral-950 rounded-xl w-9 h-9 flex items-center justify-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">iE</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                iEMT Lab
              </span>
            </a>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 max-w-xs">
              Advancing Tomorrow: Innovating Electric Motors for a Transformative Experience.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Animated key={social.name} animation="zoom-in" delay={index * 100} duration={600}>
                  <a
                    href={social.href}
                    className="w-11 h-11 rounded-xl bg-neutral-800/40 border border-neutral-700/40 flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-300 hover:scale-105"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                </Animated>
              ))}
            </div>
          </Animated>

          {/* Navigation Links */}
          <Animated animation="slide-up" delay={120} duration={1000} distance={50}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.main.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm inline-block hover:translate-x-1 transition-transform"
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Animated>

          {/* Products */}
          <Animated animation="slide-up" delay={240} duration={1000} distance={50}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Our Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm inline-block hover:translate-x-1 transition-transform"
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Animated>

          {/* Contact Info */}
          <Animated animation="slide-up" delay={360} duration={1000} distance={50}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-neutral-800/40 flex items-center justify-center text-primary-400 flex-shrink-0 group-hover:bg-primary-500/15 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-neutral-400 text-sm pt-2">
                  Karlovo, Bulgaria
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-neutral-800/40 flex items-center justify-center text-primary-400 flex-shrink-0 group-hover:bg-primary-500/15 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:+359893542287" className="text-neutral-400 hover:text-white transition-colors text-sm pt-2">
                  +359 89 354 2287
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-neutral-800/40 flex items-center justify-center text-primary-400 flex-shrink-0 group-hover:bg-primary-500/15 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:contact@iemt-lab.com" className="text-neutral-400 hover:text-white transition-colors text-sm pt-2">
                  contact@iemt-lab.com
                </a>
              </li>
            </ul>
          </Animated>
        </div>

        {/* Bottom Bar */}
        <Animated animation="slide-up" delay={450} duration={900} distance={30}>
          <div className="mt-16 pt-8 border-t border-neutral-800/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © 2026 iEMT Lab. All rights reserved.
            </p>
            <div className="flex gap-8">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-neutral-500 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </Animated>
      </div>
    </footer>
  );
}

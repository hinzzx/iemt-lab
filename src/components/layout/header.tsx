"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuoteFormModal } from "@/components/ui/quote-form-modal";
import { handleSectionNavigation, handleInitialHash } from "@/lib/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/#products" },
  { name: "About Us", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

// Pure CSS animations - no inline styles needed

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Scroll handler - solid background on any scroll
  useEffect(() => {
    const handleScroll = () => {
      // Trigger solid background immediately on any scroll
      const shouldShowBackground = window.scrollY > 0;
      setIsScrolled(shouldShowBackground);
    };

    // Set initial state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // REMOVED: Scroll lock - causes performance issues on high refresh rate displays

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Handle hash navigation on initial page load
  useEffect(() => {
    handleInitialHash();
  }, []);

  return (
    <>
      {/* Header Bar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          isScrolled
            ? "bg-navy-900 border-b border-navy-700/50 py-3"
            : "bg-transparent py-5",
          "transition-[background-color,padding,border-color] duration-300"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="relative h-20 w-[280px] flex items-center">
                <Image
                  src="/logos/full_transparent.svg"
                  alt="iEMT Lab"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSectionNavigation(e, item.href)}
                  className="relative px-4 py-2 text-sm font-semibold text-ice-100 hover:text-white transition-colors duration-150"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-500 scale-x-0 hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                Get Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`burger-btn md:hidden ${isMobileMenuOpen ? 'is-open' : ''}`}
              onClick={toggleMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              data-animation="morph-lines"
            >
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Pure CSS animations */}
      <div
        className={cn(
          "mobile-menu-overlay",
          isMobileMenuOpen && "is-open"
        )}
        aria-hidden={!isMobileMenuOpen}
        data-menu-open={isMobileMenuOpen}
      >
        {/* Background */}
        <div className="mobile-menu-bg" />
        
        {/* Content Container */}
        <div className="mobile-menu-content">
          {/* Navigation Links */}
          <nav className="space-y-1 mb-12">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "mobile-menu-link",
                  `mobile-menu-link-${index}`
                )}
                onClick={(e) => handleSectionNavigation(e, item.href, closeMenu)}
              >
                <span className="mobile-menu-bullet">•</span>
                <span className="mobile-menu-text">{item.name}</span>
                <svg 
                  className="mobile-menu-arrow"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Animated Divider */}
          <div className="mobile-menu-divider" />

          {/* CTA Button */}
          <div className="mobile-menu-cta">
            <Button 
              variant="secondary" 
              size="lg" 
              className="w-full h-14 rounded-2xl text-base font-semibold active:scale-[0.98] transition-transform duration-150 touch-manipulation"
              onClick={() => {
                closeMenu();
                setIsQuoteModalOpen(true);
              }}
            >
              Get Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>

          {/* Footer */}
          <p className="mobile-menu-footer">
            © 2026 iEMT Lab
          </p>
        </div>
      </div>

      {/* Quote Form Modal */}
      <QuoteFormModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "Products", href: "/#products" },
  { name: "About Us", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
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
            <Link href="/" className="flex items-center gap-3">
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
                  className="relative px-4 py-2 text-sm font-semibold text-ice-100 hover:text-white transition-colors duration-150"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-500 scale-x-0 hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Button variant="secondary" size="sm">
                Get Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </div>

            {/* Mobile Menu Button - Simple, performant */}
            <button
              className="md:hidden relative w-12 h-12 flex items-center justify-center touch-manipulation -mr-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-5">
                <span 
                  className={cn(
                    "absolute left-0 top-0 w-full h-0.5 rounded-full transition-transform duration-200",
                    isMobileMenuOpen ? "bg-white translate-y-[9px] rotate-45" : "bg-ice-100 translate-y-0 rotate-0"
                  )}
                />
                <span 
                  className={cn(
                    "absolute left-0 top-[9px] w-full h-0.5 rounded-full transition-opacity duration-200",
                    isMobileMenuOpen ? "bg-white opacity-0" : "bg-ice-100 opacity-100"
                  )}
                />
                <span 
                  className={cn(
                    "absolute left-0 top-[18px] w-full h-0.5 rounded-full transition-transform duration-200",
                    isMobileMenuOpen ? "bg-white -translate-y-[9px] -rotate-45" : "bg-ice-100 translate-y-0 rotate-0"
                  )}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Premium animations */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40",
          isMobileMenuOpen 
            ? "pointer-events-auto" 
            : "pointer-events-none"
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Background with smooth reveal */}
        <div 
          className={cn(
            "absolute inset-0 bg-navy-900 transition-opacity duration-300 ease-out",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
        />
        
        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-center px-8">
          {/* Navigation Links - Staggered premium entrance */}
          <nav className="space-y-1 mb-12">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-5 py-4 px-5 -mx-5 rounded-2xl touch-manipulation",
                  "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "active:scale-[0.98] active:bg-navy-800/80",
                  isMobileMenuOpen 
                    ? "translate-x-0 opacity-100" 
                    : "-translate-x-6 opacity-0"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 60 + 100}ms` : '0ms'
                }}
                onClick={closeMenu}
              >
                {/* Animated index number */}
                <span 
                  className={cn(
                    "text-amber-500 text-sm font-mono font-medium w-7 transition-all duration-300",
                    "group-active:text-amber-400"
                  )}
                >
                  0{index + 1}
                </span>
                
                {/* Link text with hover effect */}
                <span className="text-2xl font-semibold text-ice-100 tracking-tight group-active:text-white transition-colors duration-150">
                  {item.name}
                </span>
                
                {/* Arrow with entrance animation */}
                <svg 
                  className={cn(
                    "w-5 h-5 ml-auto text-ice-600 transition-all duration-300 ease-out",
                    "group-active:text-ice-400 group-active:translate-x-1"
                  )}
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
          <div 
            className={cn(
              "h-px bg-gradient-to-r from-transparent via-navy-600 to-transparent mb-8 transition-all duration-500 ease-out",
              isMobileMenuOpen 
                ? "opacity-100 scale-x-100" 
                : "opacity-0 scale-x-0"
            )}
            style={{ transitionDelay: isMobileMenuOpen ? '280ms' : '0ms' }}
          />

          {/* CTA Button with entrance */}
          <div
            className={cn(
              "transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isMobileMenuOpen 
                ? "translate-y-0 opacity-100" 
                : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: isMobileMenuOpen ? '320ms' : '0ms' }}
          >
            <Link href="/#contact" onClick={closeMenu} className="touch-manipulation block">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full h-14 rounded-2xl text-base font-semibold active:scale-[0.98] transition-transform duration-150"
              >
                Get Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Footer with fade */}
          <p 
            className={cn(
              "text-center text-ice-600/40 text-xs mt-10 tracking-widest uppercase transition-opacity duration-300",
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: isMobileMenuOpen ? '400ms' : '0ms' }}
          >
            © 2026 iEMT Lab
          </p>
        </div>
      </div>
    </>
  );
}

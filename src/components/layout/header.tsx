"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useSyncExternalStore, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "Products", href: "/#products" },
  { name: "About Us", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

// Custom hook for scroll position (avoids setState in useEffect)
function useScrollPosition() {
  const subscribe = (callback: () => void) => {
    window.addEventListener("scroll", callback, { passive: true });
    return () => window.removeEventListener("scroll", callback);
  };
  const getSnapshot = () => window.scrollY > 50;
  const getServerSnapshot = () => false;
  
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function Header() {
  const isScrolled = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0",
          isMobileMenuOpen ? "z-[60]" : "z-50",
          isScrolled
            ? "bg-navy-800/95 border-b border-ice-300/20 py-3 shadow-lg shadow-navy-900/40"
            : "bg-transparent py-5",
          "transition-[background-color,padding,border-color,box-shadow] duration-200 ease-out"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-20 w-[280px] flex items-center">
              <Image
                src="/logos/full_transparent.svg"
                alt="iEMT Lab"
                fill
                className="transition-opacity duration-300 group-hover:opacity-80 object-contain object-left"
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
                className="relative px-4 py-2 text-sm font-semibold text-ice-100 hover:text-white transition-colors duration-200 group"
              >
                {item.name}
                {/* Hover underline - amber per spec */}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-500 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="secondary" size="sm" className="hover-icon-shift">
              Get Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden relative w-10 h-10 flex items-center justify-center transition-colors z-[60]",
              isMobileMenuOpen ? "text-white" : "text-ice-100 hover:text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span 
                className={cn(
                  "absolute w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center",
                  isMobileMenuOpen ? "rotate-45" : "-translate-y-2"
                )} 
              />
              <span 
                className={cn(
                  "absolute w-full h-0.5 bg-current rounded-full transition-all duration-300",
                  isMobileMenuOpen && "opacity-0 scale-0"
                )} 
              />
              <span 
                className={cn(
                  "absolute w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center",
                  isMobileMenuOpen ? "-rotate-45" : "translate-y-2"
                )} 
              />
            </div>
          </button>
        </div>
      </nav>
      </header>

      {/* Fullscreen Mobile Menu - Outside header to avoid transparency issues */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-[55]",
          isMobileMenuOpen 
            ? "pointer-events-auto" 
            : "pointer-events-none"
        )}
      >
        {/* Premium background with subtle effects */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-[#0a1929] via-[#0d1d2f] to-[#0a1929] transition-opacity duration-500",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Subtle ambient glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-cyan-500/3 rounded-full blur-[100px]" />
        </div>
        
        {/* Content layer - Premium minimalistic design */}
        <div className={cn(
          "relative flex flex-col justify-center h-full px-10 transition-all duration-500",
          isMobileMenuOpen 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}>
          {/* Navigation Links - Refined layout */}
          <nav className="space-y-1 mb-16">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-6 py-3 px-4 -mx-4 rounded-xl",
                  "transform transition-all duration-300",
                  "hover:bg-navy-700/30",
                  isMobileMenuOpen 
                    ? "translate-x-0 opacity-100" 
                    : "-translate-x-8 opacity-0"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50 + 100}ms` : "0ms"
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {/* Index number - Premium detail */}
                <span className="text-amber-500/40 text-sm font-mono font-medium min-w-[2ch] group-hover:text-amber-400/60 transition-colors">
                  0{index + 1}
                </span>
                
                {/* Link text */}
                <span className="text-xl font-semibold text-ice-100 group-hover:text-white transition-colors tracking-tight">
                  {item.name}
                </span>
                
                {/* Arrow indicator */}
                <svg 
                  className="w-4 h-4 ml-auto text-ice-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                
                {/* Subtle accent line */}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/20 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA Section - Refined */}
          <div 
            className={cn(
              "transform transition-all duration-500 space-y-6",
              isMobileMenuOpen 
                ? "translate-y-0 opacity-100" 
                : "translate-y-8 opacity-0"
            )}
            style={{
              transitionDelay: isMobileMenuOpen ? `${navigation.length * 50 + 150}ms` : "0ms"
            }}
          >
            {/* Decorative divider */}
            <div className="flex items-center gap-3 px-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-ice-800/30" />
              <div className="w-1 h-1 rounded-full bg-amber-500/30" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-ice-800/30" />
            </div>

            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full text-sm font-semibold h-12 rounded-xl hover-lift group"
              >
                <span>Get Quote</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>

            {/* Footer info - Ultra minimal */}
            <p className="text-center text-ice-600/40 text-xs tracking-[0.2em] font-light mt-4">
              © 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

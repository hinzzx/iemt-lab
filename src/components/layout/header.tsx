"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { QuoteFormModal } from "@/components/ui/quote-form-modal";
import { handleSectionNavigation, handleInitialHash } from "@/lib/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/#products" },
  { name: "About Us", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

// CSS for pre-promoted GPU layers - applied immediately, no state needed
const gpuLayerStyles = {
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden' as const,
  WebkitBackfaceVisibility: 'hidden' as const,
  // Always hint willChange for burger lines - they WILL animate
  willChange: 'transform, opacity',
} as const;

// Overlay GPU promotion styles
const overlayGpuStyles = {
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden' as const,
  WebkitBackfaceVisibility: 'hidden' as const,
  willChange: 'opacity',
  // CSS containment for paint isolation
  contain: 'layout paint',
} as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  // Track if menu has ever been opened (for staggered animation optimization)
  const hasEverOpened = useRef(false);

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
      hasEverOpened.current = true;
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Single state update toggle - no conditional checks during click
  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
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

            {/* Mobile Menu Button - GPU layers pre-promoted for instant animation */}
            <button
              className="md:hidden relative w-12 h-12 flex items-center justify-center touch-manipulation -mr-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              style={{
                // Prevent any layout shifts during interaction
                contain: 'layout',
                // Isolate this compositing layer from others
                isolation: 'isolate',
              }}
            >
              <div className="relative w-6 h-5">
                {/* Top line - GPU pre-promoted with translate3d base transform */}
                <span 
                  className={cn(
                    "absolute left-0 top-0 w-full h-0.5 rounded-full",
                    // Always enable transitions - CSS warm-up handles readiness
                    "transition-[transform,background-color] duration-200 ease-out",
                    // CSS class for warm-up animation that forces early compositing
                    "burger-line-warmup",
                    isMobileMenuOpen ? "bg-white" : "bg-ice-100"
                  )}
                  style={{
                    ...gpuLayerStyles,
                    // Apply transforms additively on the pre-promoted layer
                    transform: isMobileMenuOpen 
                      ? 'translate3d(0, 9px, 0) rotate(45deg)' 
                      : 'translate3d(0, 0, 0) rotate(0deg)',
                  }}
                />
                {/* Middle line - opacity animation */}
                <span 
                  className={cn(
                    "absolute left-0 top-[9px] w-full h-0.5 rounded-full",
                    "transition-opacity duration-200 ease-out",
                    "burger-line-warmup",
                    isMobileMenuOpen ? "bg-white" : "bg-ice-100"
                  )}
                  style={{
                    ...gpuLayerStyles,
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                />
                {/* Bottom line - GPU pre-promoted with translate3d base transform */}
                <span 
                  className={cn(
                    "absolute left-0 top-[18px] w-full h-0.5 rounded-full",
                    "transition-[transform,background-color] duration-200 ease-out",
                    "burger-line-warmup",
                    isMobileMenuOpen ? "bg-white" : "bg-ice-100"
                  )}
                  style={{
                    ...gpuLayerStyles,
                    transform: isMobileMenuOpen 
                      ? 'translate3d(0, -9px, 0) rotate(-45deg)' 
                      : 'translate3d(0, 0, 0) rotate(0deg)',
                  }}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - GPU layers pre-promoted for instant first-interaction */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40",
          isMobileMenuOpen 
            ? "pointer-events-auto" 
            : "pointer-events-none"
        )}
        aria-hidden={!isMobileMenuOpen}
        style={overlayGpuStyles}
      >
        {/* Background with smooth reveal - GPU pre-promoted */}
        <div 
          className={cn(
            "absolute inset-0 bg-navy-900 transition-opacity duration-300 ease-out",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          style={overlayGpuStyles}
        />
        
        {/* Content Container - GPU pre-promoted */}
        <div 
          className="relative h-full flex flex-col justify-center px-8"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
          }}
        >
          {/* Navigation Links - GPU-accelerated staggered entrance */}
          <nav className="space-y-1 mb-12">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-5 py-4 px-5 -mx-5 rounded-2xl touch-manipulation",
                  "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "active:scale-[0.98] active:bg-navy-800/80"
                )}
                style={{
                  transform: isMobileMenuOpen 
                    ? 'translate3d(0, 0, 0)' 
                    : 'translate3d(-24px, 0, 0)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transitionDelay: isMobileMenuOpen ? `${index * 60 + 100}ms` : '0ms',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity',
                }}
                onClick={(e) => handleSectionNavigation(e, item.href, closeMenu)}
              >
                {/* Bullet point */}
                <span 
                  className={cn(
                    "text-amber-500 text-xl font-bold w-7 transition-colors duration-300",
                    "group-active:text-amber-400"
                  )}
                >
                  •
                </span>
                
                {/* Link text with hover effect */}
                <span className="text-2xl font-semibold text-ice-100 tracking-tight group-active:text-white transition-colors duration-150">
                  {item.name}
                </span>
                
                {/* Arrow with entrance animation */}
                <svg 
                  className={cn(
                    "w-5 h-5 ml-auto text-ice-600 transition-[color,transform] duration-300 ease-out",
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

          {/* Animated Divider - GPU-accelerated */}
          <div 
            className="h-px bg-gradient-to-r from-transparent via-navy-600 to-transparent mb-8 transition-[transform,opacity] duration-500 ease-out"
            style={{ 
              transform: isMobileMenuOpen 
                ? 'translate3d(0, 0, 0) scaleX(1)' 
                : 'translate3d(0, 0, 0) scaleX(0)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionDelay: isMobileMenuOpen ? '280ms' : '0ms',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity',
            }}
          />

          {/* CTA Button with entrance - GPU-accelerated */}
          <div
            className="transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ 
              transform: isMobileMenuOpen 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, 16px, 0)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionDelay: isMobileMenuOpen ? '320ms' : '0ms',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity',
            }}
          >
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

          {/* Footer with fade */}
          <p 
            className={cn(
              "text-center text-ice-600/40 text-xs mt-10 tracking-widest uppercase transition-opacity duration-300",
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            )}
            style={{ 
              transitionDelay: isMobileMenuOpen ? '400ms' : '0ms',
              backfaceVisibility: 'hidden',
            }}
          >
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

"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#products" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsLoaded(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-800/40 py-3"
          : "bg-transparent py-5",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )}
      style={{
        transitionProperty: "opacity, transform, background-color, padding, border-color",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-400" />
              <div className="relative bg-neutral-950 rounded-xl w-9 h-9 flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
                <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">iE</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-primary-400 transition-colors duration-300">
              iEMT Lab
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white group"
                style={{ 
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(-10px)",
                  transitionProperty: "opacity, transform, color",
                  transitionDuration: "0.6s, 0.6s, 0.3s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1), ease",
                  transitionDelay: isLoaded ? `${index * 50}ms, ${index * 50}ms, 0ms` : "0ms",
                }}
              >
                {item.name}
                {/* Hover underline */}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div 
            className="hidden md:block"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(-10px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "0.6s",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.3s",
            }}
          >
            <Button variant="primary" size="sm" className="hover-icon-shift">
              Get Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
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

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500",
            isMobileMenuOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="flex flex-col gap-2 py-4 border-t border-neutral-800/40 bg-neutral-950/95 backdrop-blur-xl rounded-2xl -mx-2 px-2">
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-3 text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/40 rounded-xl"
                style={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-10px)",
                  transitionProperty: "opacity, transform, background-color, color",
                  transitionDuration: "0.4s, 0.4s, 0.3s, 0.3s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isMobileMenuOpen ? `${index * 75}ms, ${index * 75}ms, 0ms, 0ms` : "0ms",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 px-4">
              <Button variant="primary" size="md" className="w-full">
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

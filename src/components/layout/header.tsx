"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useSyncExternalStore } from "react";
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        isScrolled
          ? "bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800/40 py-3"
          : "bg-transparent py-5",
        // Smooth transition for scroll state only
        "transition-[background-color,padding,border-color] duration-300 ease-out"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-400" />
              <div className="relative bg-neutral-950 rounded-xl w-9 h-9 flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
                <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">iE</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-primary-400 transition-colors duration-300">
              iEMT Lab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200 group"
              >
                {item.name}
                {/* Hover underline */}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
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
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
            isMobileMenuOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-2 py-4 border-t border-neutral-800/40 bg-neutral-950/95 rounded-2xl -mx-2 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-3 text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/40 rounded-xl transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
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

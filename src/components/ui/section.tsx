"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";
import Image from "next/image";
import { Animated } from "./animated";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "default" | "dark" | "gradient" | "light";
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  backgroundImage?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", containerSize = "xl", backgroundImage, children, ...props }, ref) => {
    const variants = {
      default: "bg-navy-700",
      dark: "bg-navy-900",
      gradient: "bg-gradient-to-b from-navy-700 via-navy-800 to-navy-700",
      light: "bg-ice-100",
    };

    const sizes = {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "relative py-24 md:py-32 lg:py-40 overflow-hidden",
          variants[variant],
          className
        )}
        {...props}
      >
        {/* Background Image */}
        {backgroundImage && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              quality={30} // Lower quality for background images
              priority={false} // Lazy load background images
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-700/50 via-navy-700/70 to-navy-700" />
          </div>
        )}
        
        {/* Minimal grid pattern - only if no background image */}
        {!backgroundImage && (
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none" />
        )}
        
        <div className={cn("relative mx-auto px-6 lg:px-8", sizes[containerSize])}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  badge?: string;
  lightMode?: boolean;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, align = "center", badge, lightMode = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-16 md:mb-20",
          align === "center" && "text-center",
          className
        )}
        {...props}
      >
        {badge && (
          <Animated animation="fade" duration={500} distance={20}>
            <span className={cn(
              "inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.2em] uppercase rounded-full",
              lightMode 
                ? "bg-navy-700/15 text-navy-600 border border-navy-500/20"
                : "bg-amber-500/15 text-amber-400 border border-amber-500/25 shadow-sm"
            )}>
              {badge}
            </span>
          </Animated>
        )}
        <Animated animation="slide-up" delay={80} duration={600} distance={30}>
          {/* H2 spec: Montserrat Bold, UPPERCASE, letter-spacing 0.03em */}
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider",
            lightMode ? "text-navy-700" : "text-ice-100"
          )}>
            {title}
          </h2>
        </Animated>
        {subtitle && (
          <Animated animation="slide-up" delay={150} duration={600} distance={25}>
            <p className={cn(
              "mt-6 text-lg md:text-xl leading-relaxed",
              align === "center" && "max-w-2xl mx-auto",
              lightMode ? "text-navy-500" : "text-ice-400"
            )}>
              {subtitle}
            </p>
          </Animated>
        )}
        {/* Decorative line */}
        <Animated animation="fade" delay={220} duration={400}>
          <div className={cn(
            "mt-8 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent",
            align === "center" ? "mx-auto max-w-xs" : "max-w-xs"
          )} />
        </Animated>
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export { Section, SectionHeader };

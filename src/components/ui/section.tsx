"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";
import { Animated } from "./animated";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "default" | "dark" | "gradient";
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  backgroundImage?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", containerSize = "xl", backgroundImage, children, ...props }, ref) => {
    const variants = {
      default: "bg-neutral-950",
      dark: "bg-neutral-900",
      gradient: "bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950",
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
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/70 to-neutral-950" />
          </div>
        )}
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        
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
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, align = "center", badge, ...props }, ref) => {
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
          <Animated animation="slide-down" duration={900} distance={40}>
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.2em] uppercase bg-primary-500/8 text-primary-400 border border-primary-500/15 rounded-full">
              {badge}
            </span>
          </Animated>
        )}
        <Animated animation="slide-up" delay={100} duration={1000} distance={50}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </Animated>
        {subtitle && (
          <Animated animation="slide-up" delay={200} duration={1000} distance={40}>
            <p className={cn(
              "mt-6 text-lg md:text-xl text-neutral-400 leading-relaxed",
              align === "center" && "max-w-2xl mx-auto"
            )}>
              {subtitle}
            </p>
          </Animated>
        )}
        {/* Decorative line */}
        <Animated animation="zoom-in" delay={350} duration={800}>
          <div className={cn(
            "mt-8 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent",
            align === "center" ? "mx-auto max-w-xs" : "max-w-xs"
          )} />
        </Animated>
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export { Section, SectionHeader };

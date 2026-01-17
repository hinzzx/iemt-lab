"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  // Base styles per spec: uppercase, letter-spacing 0.02em, font-semibold (600)
  "relative inline-flex items-center justify-center gap-2.5 font-semibold uppercase tracking-wide overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Primary: Navy deep background, ice text
        primary:
          "bg-navy-700 text-ice-100 shadow-sm hover:bg-navy-800 hover:shadow-md focus-visible:ring-amber-500 focus-visible:ring-offset-navy-900",
        // Secondary: Amber accent fill, navy text
        secondary:
          "bg-amber-500 text-navy-900 shadow-sm hover:bg-amber-600 hover:shadow-md focus-visible:ring-amber-500 focus-visible:ring-offset-navy-900",
        // Outline: Transparent with navy border
        outline:
          "border-2 border-navy-700 text-navy-700 bg-transparent hover:bg-navy-50 focus-visible:ring-navy-500",
        // Ghost: For dark backgrounds
        ghost:
          "border border-ice-400/30 text-ice-100 bg-navy-900/40 hover:bg-ice-400/10 hover:border-ice-400/50 focus-visible:ring-ice-400",
        // Tertiary: Subtle, text-only feel
        tertiary:
          "text-ice-300 hover:text-ice-100 hover:bg-navy-800/60",
        // Eco: For conversion CTAs
        eco:
          "bg-eco text-white shadow-sm hover:bg-[#43A047] hover:shadow-md focus-visible:ring-eco",
        // Power: For ATV/Performance CTAs
        power:
          "bg-power text-white shadow-sm hover:bg-[#E55A2B] hover:shadow-md focus-visible:ring-power",
        // Destructive
        destructive:
          "bg-error text-white hover:bg-[#C62828] hover:shadow-md focus-visible:ring-error",
      },
      size: {
        xs: "h-7 px-3 text-xs rounded",
        sm: "h-9 px-4 text-sm rounded",
        md: "h-11 px-6 text-base rounded",
        lg: "h-12 px-7 text-lg rounded-lg",
        xl: "h-14 px-8 text-lg rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
        
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

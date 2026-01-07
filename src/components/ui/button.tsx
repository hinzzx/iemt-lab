"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2.5 font-medium overflow-hidden transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg shadow-secondary-500/25 hover:shadow-xl hover:shadow-secondary-500/30 hover:-translate-y-0.5 focus-visible:ring-secondary-500",
        secondary:
          "border-2 border-primary-500/60 text-primary-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/20 focus-visible:ring-primary-500",
        tertiary:
          "text-neutral-300 hover:text-white hover:bg-neutral-800/80",
        ghost:
          "border border-white/20 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 focus-visible:ring-white",
        destructive:
          "bg-gradient-to-r from-error-500 to-error-600 text-white hover:shadow-lg hover:shadow-error-500/25 focus-visible:ring-error-500",
      },
      size: {
        xs: "h-7 px-3 text-xs rounded-md",
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-base rounded-lg",
        lg: "h-12 px-7 text-lg rounded-xl",
        xl: "h-14 px-8 text-lg rounded-xl",
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

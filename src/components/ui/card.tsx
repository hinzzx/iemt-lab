"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Spec: Cards use white bg, default border, lg radius, md shadow
        "relative rounded-lg border border-ice-200 bg-white overflow-hidden",
        "shadow-md",
        "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        // Hover: lg shadow, strong border
        "hover:border-ice-400 hover:shadow-lg",
        "group",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// For dark theme cards (on navy backgrounds) — Premium surface treatment
const CardDark = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Solid premium surface - NO backdrop-blur for performance
        "relative rounded-xl bg-navy-700/85 overflow-hidden",
        // Refined border
        "border border-ice-300/20",
        // Subtle inner highlight
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        "shadow-lg shadow-navy-900/30",
        "transition-[background-color,border-color,box-shadow] duration-200 ease-out",
        // Hover: subtle enhancement
        "hover:bg-navy-700/95 hover:border-ice-300/30",
        "hover:shadow-xl hover:shadow-navy-900/40",
        "group",
        className
      )}
      {...props}
    />
  )
);
CardDark.displayName = "CardDark";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 p-6 pb-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        // H3 spec: Montserrat SemiBold, Title Case (handled by content), leading-tight
        "text-xl font-semibold leading-tight tracking-tight text-navy-700",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// Dark variant title for navy backgrounds
const CardTitleDark = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold leading-tight tracking-tight text-ice-100",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
);
CardTitleDark.displayName = "CardTitleDark";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm text-navy-400 leading-relaxed",
        "transition-colors duration-200 group-hover:text-navy-500",
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// Dark variant description
const CardDescriptionDark = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm text-ice-400 leading-relaxed",
        "transition-colors duration-200 group-hover:text-ice-300",
        className
      )}
      {...props}
    />
  )
);
CardDescriptionDark.displayName = "CardDescriptionDark";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-2", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { 
  Card, 
  CardDark,
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardTitleDark,
  CardDescription, 
  CardDescriptionDark,
  CardContent 
};

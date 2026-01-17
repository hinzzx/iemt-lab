"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full group">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-ice-300 mb-2.5 transition-colors duration-200 group-focus-within:text-amber-400"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            id={id}
            className={cn(
              // Spec: white bg, default border, md radius, body font
              "flex h-12 w-full rounded border border-navy-600/50 bg-navy-800/40 px-4 py-3 text-base text-ice-100 placeholder:text-ice-500",
              "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
              // Focus: amber border (--color-border-focus), amber outline
              "focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20",
              "hover:border-navy-500 hover:bg-navy-800/60",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-error/60 focus:border-error focus:ring-error/20",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2.5 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

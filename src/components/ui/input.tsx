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
            className="block text-sm font-medium text-neutral-300 mb-2.5 transition-colors duration-200 group-focus-within:text-primary-400"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            id={id}
            className={cn(
              "flex h-12 w-full rounded-xl border border-neutral-700/60 bg-neutral-800/40 px-4 py-3 text-base text-white placeholder:text-neutral-500",
              "transition-all duration-300 ease-out",
              "focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10",
              "hover:border-neutral-600 hover:bg-neutral-800/60",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/10",
              className
            )}
            ref={ref}
            {...props}
          />
          {/* Focus glow effect */}
          <div className="absolute inset-0 rounded-xl bg-primary-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        {error && (
          <p className="mt-2.5 text-sm text-red-400 animate-reveal-up">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

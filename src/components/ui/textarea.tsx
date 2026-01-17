"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
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
          <textarea
            id={id}
            className={cn(
              "flex min-h-[140px] w-full rounded border border-navy-600/50 bg-navy-800/40 px-4 py-3 text-base text-ice-100 placeholder:text-ice-500 resize-y",
              "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
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

Textarea.displayName = "Textarea";

export { Textarea };

"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-neutral-700/60 text-neutral-200 hover:bg-neutral-700/80",
        primary: "bg-primary-500/15 text-primary-400 border border-primary-500/30 hover:bg-primary-500/25 hover:border-primary-500/50",
        secondary: "bg-secondary-500/15 text-secondary-400 border border-secondary-500/30 hover:bg-secondary-500/25",
        success: "bg-green-500/15 text-green-400 border border-green-500/30",
        warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
        error: "bg-red-500/15 text-red-400 border border-red-500/30",
        info: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
        outline: "border border-neutral-600 text-neutral-300 hover:bg-neutral-800/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

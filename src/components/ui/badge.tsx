"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase transition-all duration-200",
  {
    variants: {
      variant: {
        // Default: Subtle navy on light
        default: "bg-navy-100 text-navy-700 hover:bg-navy-200",
        // Primary: Navy with ice border
        primary: "bg-navy-700/10 text-navy-600 border border-navy-500/20 hover:bg-navy-700/15 hover:border-navy-500/30",
        // Secondary: Amber accent
        secondary: "bg-amber-500/15 text-amber-600 border border-amber-500/30 hover:bg-amber-500/25",
        // Cloud/Software
        cloud: "bg-cloud/15 text-[#1E8FAF] border border-cloud/30",
        // Eco/Conversion
        eco: "bg-eco/15 text-[#2E7D32] border border-eco/30",
        // Power/Performance  
        power: "bg-power/15 text-[#D84315] border border-power/30",
        // Solid variants for dark backgrounds - high contrast & readable
        "cloud-solid": "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/30",
        "eco-solid": "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md shadow-emerald-500/30",
        "power-solid": "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30",
        "secondary-solid": "bg-gradient-to-r from-amber-400 to-yellow-500 text-navy-900 shadow-md shadow-amber-500/30 font-bold",
        // Status variants
        success: "bg-success/15 text-[#2E7D32] border border-success/30",
        warning: "bg-warning/15 text-[#F57F17] border border-warning/30",
        error: "bg-error/15 text-[#C62828] border border-error/30",
        info: "bg-info/15 text-[#1565C0] border border-info/30",
        // Outline for dark backgrounds
        outline: "border border-ice-400/40 text-ice-300 hover:bg-ice-400/10",
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

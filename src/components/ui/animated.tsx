"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { forwardRef, useCallback, type HTMLAttributes, type ReactNode, type CSSProperties } from "react";

type AnimationType = 
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-up"
  | "flip-left"
  | "rotate-in"
  | "blur-in"
  | "bounce-in"
  | "none";

interface AnimatedProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  distance?: number;
  as?: "div" | "section" | "article" | "aside" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const getAnimationStyles = (
  animation: AnimationType, 
  isVisible: boolean, 
  distance: number = 60
): CSSProperties => {
  // Optimized: Use only GPU-accelerated properties (transform, opacity)
  // Avoid filter (blur) for better performance
  const getTransform = (): CSSProperties => {
    if (isVisible) {
      return { 
        opacity: 1, 
        transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
      };
    }

    switch (animation) {
      case "slide-up":
        return { 
          opacity: 0, 
          transform: `translate3d(0, ${distance}px, 0)`,
        };
      case "slide-down":
        return { 
          opacity: 0, 
          transform: `translate3d(0, -${distance}px, 0)`,
        };
      case "slide-left":
        return { 
          opacity: 0, 
          transform: `translate3d(${distance}px, 0, 0)`,
        };
      case "slide-right":
        return { 
          opacity: 0, 
          transform: `translate3d(-${distance}px, 0, 0)`,
        };
      case "zoom-in":
        return { 
          opacity: 0, 
          transform: "scale3d(0.9, 0.9, 1)",
        };
      case "zoom-out":
        return { 
          opacity: 0, 
          transform: "scale3d(1.1, 1.1, 1)",
        };
      case "flip-up":
        return { 
          opacity: 0, 
          transform: `translate3d(0, ${distance * 0.7}px, 0) scale3d(0.95, 0.95, 1)`,
        };
      case "flip-left":
        return { 
          opacity: 0, 
          transform: `translate3d(${distance * 0.7}px, 0, 0) scale3d(0.95, 0.95, 1)`,
        };
      case "rotate-in":
        return { 
          opacity: 0, 
          transform: "scale3d(0.92, 0.92, 1)",
        };
      case "blur-in":
        // Replaced blur with simple fade + slight movement for performance
        return { 
          opacity: 0, 
          transform: `translate3d(0, ${distance * 0.4}px, 0)`,
        };
      case "bounce-in":
        return { 
          opacity: 0, 
          transform: `translate3d(0, ${distance}px, 0) scale3d(0.96, 0.96, 1)`,
        };
      case "fade":
        return { opacity: 0 };
      case "none":
      default:
        return {};
    }
  };

  return getTransform();
};

const Animated = forwardRef<HTMLDivElement, AnimatedProps>(
  (
    {
      children,
      animation = "slide-up",
      delay = 0,
      duration = 700,
      threshold = 0.05,
      triggerOnce = false,
      distance = 50,
      className,
      as: Component = "div",
      style,
      ...props
    },
    forwardedRef
  ) => {
    const { ref: scrollRef, isVisible } = useScrollAnimation<HTMLDivElement>({
      threshold,
      triggerOnce,
      delay,
    });

    const animationStyles = getAnimationStyles(animation, isVisible, distance);
    
    // Performance-optimized transitions using only GPU-accelerated properties
    const combinedStyle: CSSProperties = {
      ...animationStyles,
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)", // Smooth, premium easing
      transitionDelay: isVisible ? `${delay}ms` : "0ms",
      // Only set willChange when animating, remove after
      willChange: !isVisible ? "opacity, transform" : "auto",
      ...style,
    };

    // Combine refs safely using callback ref
    const combinedRef = useCallback((node: HTMLDivElement | null) => {
      // Set the scroll animation ref (RefObject)
      if (scrollRef && 'current' in scrollRef) {
        (scrollRef as React.RefObject<HTMLDivElement | null>).current = node;
      }
      
      // Set the forwarded ref
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.RefObject<HTMLDivElement | null>).current = node;
      }
    }, [scrollRef, forwardedRef]);

    return (
      <Component
        ref={combinedRef}
        className={className}
        style={combinedStyle}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Animated.displayName = "Animated";

// Staggered animation wrapper for lists
interface AnimatedGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  distance?: number;
}

function AnimatedGroup({
  children,
  animation = "slide-up",
  staggerDelay = 100,
  duration = 700,
  threshold = 0.05,
  triggerOnce = false,
  distance = 50,
  className,
  ...props
}: AnimatedGroupProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce,
  });

  return (
    <div ref={ref} className={className} {...props}>
      {children.map((child, index) => {
        const animationStyles = getAnimationStyles(animation, isVisible, distance);
        return (
          <div
            key={index}
            style={{
              ...animationStyles,
              transitionProperty: "opacity, transform",
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
              willChange: !isVisible ? "opacity, transform" : "auto",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

export { Animated, AnimatedGroup };
export type { AnimationType };

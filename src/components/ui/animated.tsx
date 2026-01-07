"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { forwardRef, type HTMLAttributes, type ReactNode, type CSSProperties } from "react";

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
  // Dynamic styles based on animation type and visibility
  const getTransform = (): CSSProperties => {
    if (isVisible) {
      return { 
        opacity: 1, 
        transform: "translate3d(0, 0, 0) scale3d(1, 1, 1) rotate(0deg)",
        filter: "blur(0px)"
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
          transform: "scale3d(0.85, 0.85, 1)",
        };
      case "zoom-out":
        return { 
          opacity: 0, 
          transform: "scale3d(1.15, 1.15, 1)",
        };
      case "flip-up":
        return { 
          opacity: 0, 
          transform: `perspective(1000px) rotateX(15deg) translate3d(0, ${distance}px, 0)`,
        };
      case "flip-left":
        return { 
          opacity: 0, 
          transform: `perspective(1000px) rotateY(-15deg) translate3d(${distance}px, 0, 0)`,
        };
      case "rotate-in":
        return { 
          opacity: 0, 
          transform: "rotate(-8deg) scale3d(0.9, 0.9, 1)",
        };
      case "blur-in":
        return { 
          opacity: 0, 
          filter: "blur(12px)",
          transform: `translate3d(0, ${distance / 2}px, 0)`,
        };
      case "bounce-in":
        return { 
          opacity: 0, 
          transform: `translate3d(0, ${distance}px, 0) scale3d(0.95, 0.95, 1)`,
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
      duration = 900,
      threshold = 0.05,
      triggerOnce = false,
      distance = 60,
      className,
      as: Component = "div",
      style,
      ...props
    },
    forwardedRef
  ) => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
      threshold,
      triggerOnce,
      delay,
    });

    const animationStyles = getAnimationStyles(animation, isVisible, distance);
    
    // Use separate transition properties to avoid React warning about mixing shorthand and non-shorthand
    const combinedStyle: CSSProperties = {
      ...animationStyles,
      transitionProperty: "opacity, transform, filter",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: isVisible ? `${delay}ms` : "0ms",
      willChange: isVisible ? "auto" : "opacity, transform",
      ...style,
    };

    return (
      <Component
        ref={(node) => {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
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
  staggerDelay = 120,
  duration = 900,
  threshold = 0.05,
  triggerOnce = false,
  distance = 60,
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
              transitionProperty: "opacity, transform, filter",
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
              willChange: isVisible ? "auto" : "opacity, transform",
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

"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

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

function Animated({
  children,
  animation = "slide-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  triggerOnce = true,
  distance = 30,
  className,
  as: Component = "div",
  style,
  ...props
}: AnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || animation === "none") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          element.classList.remove("is-visible");
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, animation]);

  // Map animation types to CSS classes
  const animationClass = animation !== "none" ? `scroll-${animation}` : "";

  return (
    <Component
      ref={ref}
      className={cn(animationClass, className)}
      style={{
        ...style,
        "--scroll-delay": `${delay}ms`,
        "--scroll-duration": `${duration}ms`,
        "--scroll-distance": `${distance}px`,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}

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
  duration = 600,
  threshold = 0.1,
  triggerOnce = true,
  distance = 30,
  className,
  ...props
}: AnimatedGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          element.classList.remove("is-visible");
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce]);

  const animationClass = animation !== "none" ? `scroll-${animation}` : "";

  return (
    <div ref={ref} className={cn("scroll-group", className)} {...props}>
      {children.map((child, index) => (
        <div
          key={index}
          className={animationClass}
          style={{
            "--scroll-delay": `${index * staggerDelay}ms`,
            "--scroll-duration": `${duration}ms`,
            "--scroll-distance": `${distance}px`,
          } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export { Animated, AnimatedGroup };
export type { AnimationType };

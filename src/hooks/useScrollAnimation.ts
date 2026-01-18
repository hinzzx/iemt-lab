"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1, // 10% of element visible - sweet spot for visibility
    rootMargin = "0px 0px 150px 0px", // 150px lookahead - balanced for smooth scroll
    triggerOnce = true, // Default to true for better performance
    delay = 0,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame to ensure animation starts before next paint
          // This prevents skipped frames on fast mobile scroll
          if (delay > 0) {
            timeoutId = setTimeout(() => {
              requestAnimationFrame(() => {
                setIsVisible(true);
              });
            }, delay);
          } else {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          }
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          // Clear pending timeout when scrolling away
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      // CRITICAL: Clean up timeout on unmount
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref, isVisible };
}

// Hook for staggered children animations
export function useStaggerAnimation(
  itemCount: number,
  baseDelay: number = 100,
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isVisible } = useScrollAnimation(options);
  
  const getDelay = useCallback(
    (index: number) => index * baseDelay,
    [baseDelay]
  );

  return { ref, isVisible, getDelay };
}


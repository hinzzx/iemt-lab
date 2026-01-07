"use client";

import { useEffect, useState, useCallback, useRef } from "react";

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
    threshold = 0.05,
    rootMargin = "0px 0px 80px 0px",
    triggerOnce = false,
    delay = 0,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          if (triggerOnce) {
            hasTriggeredRef.current = true;
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay]);

  // Callback ref for setting the element
  const setRef = useCallback((node: T | null) => {
    elementRef.current = node;
  }, []);

  return { ref: elementRef, setRef, isVisible };
}

// Hook for staggered children animations
export function useStaggerAnimation(
  itemCount: number,
  baseDelay: number = 100,
  options: UseScrollAnimationOptions = {}
) {
  const { ref, setRef, isVisible } = useScrollAnimation(options);
  
  const getDelay = useCallback(
    (index: number) => index * baseDelay,
    [baseDelay]
  );

  return { ref, setRef, isVisible, getDelay };
}

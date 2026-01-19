"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  children: React.ReactNode;
  imagesToPreload?: string[];
}

// Creative loading messages related to EV conversion and electric mobility
const loadingMessages = [
  "Removing the engine, importing the battery...",
  "Charging up the electrons...",
  "Converting combustion to clean energy...",
  "Turbocharging the electric motors...",
  "Downloading instant torque...",
  "Wiring up the future...",
  "Syncing with the grid...",
  "Optimizing battery efficiency...",
  "Calibrating regenerative braking...",
  "Installing zero-emission technology...",
  "Electrifying the adventure...",
  "Powering up the silent revolution...",
  "Connecting to the cloud...",
  "Boosting range algorithms...",
  "Preparing your electric journey...",
  "Assembling the battery pack...",
  "Fine-tuning the CAN bus...",
  "Activating electric drive mode...",
  "Loading sustainable mobility...",
  "Initializing green technology...",
];

export function PageLoader({ children, imagesToPreload = [] }: PageLoaderProps) {
  const [loadingState, setLoadingState] = useState<"loading" | "exiting" | "complete">("loading");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  
  // Select a random loading message on client-side only (prevents hydration mismatch)
  const [loadingMessage] = useState(() => {
    // Initialize with random message - runs only once on mount
    // We use suppressHydrationWarning on the element to handle SSR/client mismatch
    return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  });

  useEffect(() => {
    // Minimum loading time for smooth experience
    const minLoadTime = 800;
    const startTime = Date.now();

    // Preload all images
    const preloadImages = async () => {
      if (imagesToPreload.length === 0) {
        setLoadingProgress(100);
        return;
      }

      const loadPromises = imagesToPreload.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            setLoadingProgress(((index + 1) / imagesToPreload.length) * 100);
            resolve();
          };
          img.onerror = () => {
            // Continue even if an image fails to load
            setLoadingProgress(((index + 1) / imagesToPreload.length) * 100);
            resolve();
          };
          img.src = src;
        });
      });

      await Promise.all(loadPromises);
    };

    const loadContent = async () => {
      // Wait for document to be fully loaded
      if (document.readyState === "complete") {
        await preloadImages();
      } else {
        await new Promise<void>((resolve) => {
          const handler = () => resolve();
          window.addEventListener("load", handler, { once: true });
        });
        await preloadImages();
      }

      // Ensure minimum loading time for smooth experience
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);

      const timeout1 = setTimeout(() => {
        // Start exit animation
        setLoadingState("exiting");
        // Complete after exit animation finishes
        const timeout2 = setTimeout(() => {
          setLoadingState("complete");
        }, 600);
        timeoutRefs.current.push(timeout2);
      }, remainingTime);
      timeoutRefs.current.push(timeout1);
    };

    loadContent();

    // CRITICAL: Cleanup all timeouts on unmount to prevent memory leaks
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, [imagesToPreload]);

  // Only render children when loading is complete - prevents double animation triggers
  if (loadingState === "complete") {
    return <>{children}</>;
  }

  return (
    <>
      {/* Loading Screen - Pure CSS animations */}
      <div
        className={cn(
          "page-loader",
          loadingState === "exiting" && "exiting"
        )}
      >
        {/* Ambient Background Effects */}
        <div className="page-loader-ambient">
          <div className="page-loader-glow page-loader-glow-1" />
          <div className="page-loader-glow page-loader-glow-2" />
        </div>

        {/* Content */}
        <div className="page-loader-content">
          {/* Logo */}
          <div className="page-loader-logo">
            <Image
              src="/logos/full_transparent.svg"
              alt="iEMT Lab"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Loading Bar */}
          <div className="page-loader-bar-container">
            <div
              className="page-loader-bar"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          {/* Loading Text */}
          <p className="page-loader-text" suppressHydrationWarning>
            {loadingMessage}
          </p>
        </div>
      </div>
    </>
  );
}

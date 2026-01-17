"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PageLoaderProps {
  children: React.ReactNode;
  imagesToPreload?: string[];
}

export function PageLoader({ children, imagesToPreload = [] }: PageLoaderProps) {
  const [loadingState, setLoadingState] = useState<"loading" | "exiting" | "complete">("loading");
  const [loadingProgress, setLoadingProgress] = useState(0);

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
          window.addEventListener("load", () => resolve());
        });
        await preloadImages();
      }

      // Ensure minimum loading time for smooth experience
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        // Start exit animation
        setLoadingState("exiting");
        // Complete after exit animation finishes
        setTimeout(() => {
          setLoadingState("complete");
        }, 600);
      }, remainingTime);
    };

    loadContent();
  }, [imagesToPreload]);

  // Only render children when loading is complete - prevents double animation triggers
  if (loadingState === "complete") {
    return <>{children}</>;
  }

  return (
    <>
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 transition-opacity duration-500 ${
          loadingState === "exiting" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Ambient Background Effects - Performance optimized (no blur) */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse" 
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 60%)' }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full animate-pulse" 
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 60%)', animationDelay: '1s' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Logo */}
          <div
            className={`relative w-64 h-20 transition-all duration-500 ${
              loadingState === "exiting" ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <Image
              src="/logos/full_transparent.svg"
              alt="iEMT Lab"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Loading Bar */}
          <div
            className={`w-64 h-1 bg-navy-700 rounded-full overflow-hidden transition-all duration-500 ${
              loadingState === "exiting" ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          {/* Loading Text */}
          <p
            className={`text-ice-400 text-sm font-light tracking-wider transition-all duration-500 ${
              loadingState === "exiting" ? "opacity-0" : "opacity-100"
            }`}
          >
            Loading Experience...
          </p>
        </div>
      </div>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Animated } from "@/components/ui/animated";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-background.png')`, // url is in public folder
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/75 to-neutral-950" />
      </div>

      {/* Simple Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Static Gradient Accents */}
      <div 
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,136,230,0.5) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(240,140,0,0.4) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <Animated animation="blur-in" duration={1000} distance={30} triggerOnce>
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-10 text-sm font-medium bg-neutral-800/50 text-neutral-200 border border-neutral-700/30 rounded-full backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-pulse-gentle"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            Electric Motor Technology Laboratory
          </span>
        </Animated>

        {/* Main Heading */}
        <Animated animation="slide-up" delay={150} duration={1200} distance={80} triggerOnce>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-2">
            iEMT Lab
          </h1>
        </Animated>

        {/* Tagline */}
        <Animated animation="slide-up" delay={300} duration={1200} distance={60} triggerOnce>
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-300 font-light leading-relaxed max-w-4xl mx-auto mt-8 mb-12">
            <span className="block">&ldquo;Advancing Tomorrow: Innovating Electric Motors</span>
            <span className="block mt-2">for a Transformative Experience.&rdquo;</span>
          </p>
        </Animated>

        {/* CTA Buttons */}
        <Animated animation="zoom-in" delay={500} duration={1000} triggerOnce>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#about">
              <Button 
                variant="primary" 
                size="xl" 
                className="group animate-glow-slow hover-icon-shift"
              >
                <span>Discover More</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </a>
            <a href="#products">
              <Button 
                variant="ghost" 
                size="xl"
                className="group hover-icon-shift"
              >
                <span>View Products</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Button>
            </a>
          </div>
        </Animated>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <Animated animation="slide-up" delay={800} duration={1000} distance={40} triggerOnce>
            <a
              href="#products"
              className="flex flex-col items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-300 group"
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">Scroll</span>
              <div className="w-6 h-10 rounded-full border-2 border-neutral-600 group-hover:border-neutral-400 transition-colors duration-300 flex justify-center pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-scroll-indicator"></div>
              </div>
            </a>
          </Animated>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none" />
    </section>
  );
}

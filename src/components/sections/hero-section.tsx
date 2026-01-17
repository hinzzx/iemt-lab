"use client";

import { Button } from "@/components/ui/button";
import { Animated } from "@/components/ui/animated";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-700"
    >
      {/* Background Image - Optimized overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-background.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-800/75 to-navy-700" />
      </div>

      {/* Minimal Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.12] pointer-events-none" />

      {/* Subtle Ambient Accents - Static, no animations */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.025] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(46, 173, 211, 1) 0%, transparent 65%)' }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.02] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(191, 139, 75, 1) 0%, transparent 65%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        {/* Badge - Optimized */}
        <Animated animation="fade" duration={600} distance={20} triggerOnce>
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-10 text-sm font-medium bg-navy-800/85 text-ice-200 border border-ice-400/15 rounded-full shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-eco opacity-75 animate-pulse-gentle"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-eco"></span>
            </span>
            Electric Motor Technology Laboratory
          </span>
        </Animated>

        {/* Main Heading - Snappier animation */}
        <Animated animation="slide-up" delay={100} duration={800} distance={50} triggerOnce>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-ice-100 tracking-widest leading-[1.1] mb-2">
            iEMT Lab
          </h1>
        </Animated>

        {/* Tagline - Refined timing */}
        <Animated animation="slide-up" delay={200} duration={800} distance={40} triggerOnce>
          <p className="text-xl md:text-2xl lg:text-3xl text-ice-100 font-light leading-relaxed max-w-4xl mx-auto mt-8 mb-12">
            <span className="block">&ldquo;Advancing Tomorrow: Innovating Electric Motors</span>
            <span className="block mt-2">for a Transformative Experience.&rdquo;</span>
          </p>
        </Animated>

        {/* CTA Buttons - Faster, cleaner */}
        <Animated animation="fade" delay={350} duration={600} triggerOnce>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#about">
              <Button 
                variant="secondary" 
                size="xl" 
                className="group animate-glow-subtle hover-icon-shift press-effect"
              >
                <span>Discover More</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </a>
            <a href="#products">
              <Button 
                variant="ghost" 
                size="xl"
                className="group hover-icon-shift press-effect"
              >
                <span>View Products</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Button>
            </a>
          </div>
        </Animated>

        {/* Scroll Indicator - Refined */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <Animated animation="fade" delay={500} duration={600} triggerOnce>
            <a
              href="#products"
              className="flex flex-col items-center gap-3 text-ice-400 hover:text-ice-100 transition-colors duration-200 group"
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-200">Scroll</span>
              <div className="w-6 h-10 rounded-full border-2 border-ice-500/40 group-hover:border-ice-400 transition-colors duration-200 flex justify-center pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ice-400 animate-scroll-indicator"></div>
              </div>
            </a>
          </Animated>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-700 via-navy-700/80 to-transparent pointer-events-none" />
    </section>
  );
}

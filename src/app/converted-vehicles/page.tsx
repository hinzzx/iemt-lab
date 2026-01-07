"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animated } from "@/components/ui/animated";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ConvertedVehiclesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-neutral-950">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/80 to-neutral-950" />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          
          {/* Gradient Accents */}
          <div 
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,136,230,0.5) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(240,140,0,0.4) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-32 text-center">
            <Animated animation="blur-in" duration={1000} distance={30} triggerOnce>
              <Badge variant="secondary" className="mb-8">
                Coming Soon
              </Badge>
            </Animated>

            <Animated animation="slide-up" delay={150} duration={1200} distance={80} triggerOnce>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Vehicle Conversions
              </h1>
            </Animated>

            <Animated animation="slide-up" delay={300} duration={1200} distance={60} triggerOnce>
              <p className="text-xl md:text-2xl text-neutral-300 font-light mb-6">
                Transform Any Vehicle to Electric
              </p>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12">
                From cars to buses, we convert internal combustion engine vehicles into sustainable, 
                eco-friendly electric vehicles. Embrace the future of mobility while contributing to a 
                cleaner and greener environment.
              </p>
            </Animated>

            {/* Vehicle Types Preview */}
            <Animated animation="zoom-in" delay={450} duration={1000} triggerOnce>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
                <div className="p-5 rounded-2xl bg-neutral-800/30 border border-neutral-700/30 backdrop-blur-sm group hover:border-primary-500/30 transition-all duration-300">
                  <svg className="w-10 h-10 mx-auto mb-3 text-neutral-500 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <div className="text-white font-medium text-sm">Cars</div>
                </div>
                <div className="p-5 rounded-2xl bg-neutral-800/30 border border-neutral-700/30 backdrop-blur-sm group hover:border-primary-500/30 transition-all duration-300">
                  <svg className="w-10 h-10 mx-auto mb-3 text-neutral-500 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-white font-medium text-sm">Vans</div>
                </div>
                <div className="p-5 rounded-2xl bg-neutral-800/30 border border-neutral-700/30 backdrop-blur-sm group hover:border-primary-500/30 transition-all duration-300">
                  <svg className="w-10 h-10 mx-auto mb-3 text-neutral-500 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div className="text-white font-medium text-sm">Buses</div>
                </div>
                <div className="p-5 rounded-2xl bg-neutral-800/30 border border-neutral-700/30 backdrop-blur-sm group hover:border-primary-500/30 transition-all duration-300">
                  <svg className="w-10 h-10 mx-auto mb-3 text-neutral-500 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div className="text-white font-medium text-sm">Custom</div>
                </div>
              </div>
            </Animated>

            {/* Stats Preview */}
            <Animated animation="slide-up" delay={500} duration={1000} triggerOnce>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">100%</div>
                  <div className="text-neutral-500 text-sm uppercase tracking-wider">Electric</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">0</div>
                  <div className="text-neutral-500 text-sm uppercase tracking-wider">Emissions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">∞</div>
                  <div className="text-neutral-500 text-sm uppercase tracking-wider">Possibilities</div>
                </div>
              </div>
            </Animated>

            {/* Animated Icon */}
            <Animated animation="bounce-in" delay={550} duration={1200} triggerOnce>
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-12">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/10 animate-pulse-gentle" />
                <div className="relative w-24 h-24 rounded-full bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </Animated>

            <Animated animation="slide-up" delay={650} duration={1000} triggerOnce>
              <p className="text-neutral-500 mb-8">
                Our vehicle conversion service is coming soon. Get in touch to discuss your project 
                or sign up to be the first to know when we launch.
              </p>
            </Animated>

            <Animated animation="zoom-in" delay={750} duration={900} triggerOnce>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#contact">
                  <Button variant="primary" size="xl" className="hover-icon-shift animate-glow-slow">
                    <span>Discuss Your Project</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="ghost" size="xl" className="hover-icon-shift">
                    <span>Back to Home</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </Animated>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none" />
        </section>
      </main>
      <Footer />
    </>
  );
}



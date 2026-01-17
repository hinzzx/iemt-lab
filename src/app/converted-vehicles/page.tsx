"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animated } from "@/components/ui/animated";
import { PageLoader } from "@/components/ui/page-loader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Critical images to preload
const criticalImages = [
  "/Converted_Bus.png",
  "/logos/full_transparent.svg",
];

export default function ConvertedVehiclesPage() {
  return (
    <PageLoader imagesToPreload={criticalImages}>
      <Header />
      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-700">
          {/* Background */}
          <div className="absolute inset-0 bg-navy-900">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-700/80 to-navy-700" />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          
          {/* Gradient Accents - Performance optimized (no blur) */}
          <div 
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-12 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(76, 175, 80, 0.4) 0%, transparent 60%)' }}
          />
          <div 
            className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(191, 139, 75, 0.3) 0%, transparent 60%)' }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-32 text-center">
            <Animated animation="blur-in" duration={1000} distance={30} triggerOnce>
              <Badge variant="eco-solid" className="mb-8">
                Coming Soon
              </Badge>
            </Animated>

            <Animated animation="slide-up" delay={150} duration={1200} distance={80} triggerOnce>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-ice-100 uppercase tracking-widest leading-[1.1] mb-6">
                Vehicle Conversions
              </h1>
            </Animated>

            <Animated animation="slide-up" delay={300} duration={1200} distance={60} triggerOnce>
              <p className="text-xl md:text-2xl text-ice-300 font-light mb-6">
                Transform Any Vehicle to Electric
              </p>
              <p className="text-lg text-ice-400 max-w-2xl mx-auto mb-12">
                From cars to buses, we convert internal combustion engine vehicles into sustainable, 
                eco-friendly electric vehicles. Embrace the future of mobility while contributing to a 
                cleaner and greener environment.
              </p>
            </Animated>

            {/* Vehicle Types Preview */}
            <Animated animation="zoom-in" delay={450} duration={1000} triggerOnce>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
                <div className="p-5 rounded-lg bg-navy-800/70 border border-navy-600/40 group hover:border-eco/40 transition-colors duration-200">
                  <svg className="w-10 h-10 mx-auto mb-3 text-ice-500 group-hover:text-eco transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <div className="text-ice-100 font-medium text-sm">Cars</div>
                </div>
                <div className="p-5 rounded-lg bg-navy-800/70 border border-navy-600/40 group hover:border-eco/40 transition-colors duration-200">
                  <svg className="w-10 h-10 mx-auto mb-3 text-ice-500 group-hover:text-eco transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-ice-100 font-medium text-sm">Vans</div>
                </div>
                <div className="p-5 rounded-lg bg-navy-800/70 border border-navy-600/40 group hover:border-eco/40 transition-colors duration-200">
                  <svg className="w-10 h-10 mx-auto mb-3 text-ice-500 group-hover:text-eco transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div className="text-ice-100 font-medium text-sm">Buses</div>
                </div>
                <div className="p-5 rounded-lg bg-navy-800/70 border border-navy-600/40 group hover:border-eco/40 transition-colors duration-200">
                  <svg className="w-10 h-10 mx-auto mb-3 text-ice-500 group-hover:text-eco transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div className="text-ice-100 font-medium text-sm">Custom</div>
                </div>
              </div>
            </Animated>

            {/* Stats Preview - Monospace for specs */}
            <Animated animation="slide-up" delay={500} duration={1000} triggerOnce>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient font-mono mb-2">100%</div>
                  <div className="text-ice-500 text-sm uppercase tracking-wider">Electric</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient font-mono mb-2">0</div>
                  <div className="text-ice-500 text-sm uppercase tracking-wider">Emissions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient font-mono mb-2">∞</div>
                  <div className="text-ice-500 text-sm uppercase tracking-wider">Possibilities</div>
                </div>
              </div>
            </Animated>

            <Animated animation="slide-up" delay={600} duration={1000} triggerOnce>
              <p className="text-ice-500 mb-8">
                We&apos;re working hard to bring you comprehensive vehicle conversion solutions. 
                Contact us to discuss your specific conversion needs.
              </p>
            </Animated>

            <Animated animation="zoom-in" delay={700} duration={900} triggerOnce>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#contact">
                  <Button variant="eco" size="xl" className="hover-icon-shift">
                    <span>Contact Us</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="ghost" size="xl" className="hover-icon-shift">
                    <span>Back to Home</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </Animated>
          </div>
        </section>
      </main>
      <Footer />
    </PageLoader>
  );
}

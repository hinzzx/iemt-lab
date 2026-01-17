"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animated } from "@/components/ui/animated";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function KangoZEEnhancedPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-700">
          {/* Background */}
          <div className="absolute inset-0 bg-navy-900">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-700/80 to-navy-700" />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          
          {/* Gradient Accents - Cloud blue for software/tech context */}
          <div 
            className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(46, 173, 211, 0.5) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(191, 139, 75, 0.4) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-32 text-center">
            <Animated animation="blur-in" duration={1000} distance={30} triggerOnce>
              <Badge variant="cloud-solid" className="mb-8">
                Coming Soon
              </Badge>
            </Animated>

            <Animated animation="slide-up" delay={150} duration={1200} distance={80} triggerOnce>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-ice-100 uppercase tracking-widest leading-[1.1] mb-6">
                Enhanced Kango ZE
              </h1>
            </Animated>

            <Animated animation="slide-up" delay={300} duration={1200} distance={60} triggerOnce>
              <p className="text-xl md:text-2xl text-ice-300 font-light mb-6">
                Extended Range. Enhanced Performance. Smarter Driving.
              </p>
              <p className="text-lg text-ice-400 max-w-2xl mx-auto mb-12">
                Unlock the full potential of your Renault Kangoo ZE with our advanced battery upgrade solutions. 
                Extended range, improved performance, and smart BMS technology – everything you need for a seamless 
                and efficient driving experience.
              </p>
            </Animated>

            {/* Feature Preview - Monospace for specs */}
            <Animated animation="zoom-in" delay={450} duration={1000} triggerOnce>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                <div className="p-6 rounded-lg bg-navy-800/30 border border-navy-600/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-gradient font-mono mb-2">2x</div>
                  <div className="text-ice-400 text-sm">Extended Range</div>
                </div>
                <div className="p-6 rounded-lg bg-navy-800/30 border border-navy-600/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-gradient font-mono mb-2">Smart</div>
                  <div className="text-ice-400 text-sm">BMS Technology</div>
                </div>
                <div className="p-6 rounded-lg bg-navy-800/30 border border-navy-600/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-gradient font-mono mb-2">Pro</div>
                  <div className="text-ice-400 text-sm">Performance Upgrade</div>
                </div>
              </div>
            </Animated>

            {/* Animated Icon */}
            <Animated animation="bounce-in" delay={500} duration={1200} triggerOnce>
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-12">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cloud/20 to-amber-500/10 animate-pulse-gentle" />
                <div className="relative w-24 h-24 rounded-full bg-navy-800/50 border border-navy-600/50 flex items-center justify-center">
                  <svg className="w-12 h-12 text-cloud" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
            </Animated>

            <Animated animation="slide-up" delay={600} duration={1000} triggerOnce>
              <p className="text-ice-500 mb-8">
                We&apos;re working hard to bring you the best Kango ZE enhancement solutions. 
                Sign up to be notified when this product launches.
              </p>
            </Animated>

            <Animated animation="zoom-in" delay={700} duration={900} triggerOnce>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#contact">
                  <Button variant="secondary" size="xl" className="hover-icon-shift">
                    <span>Notify Me</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
    </>
  );
}

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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-neutral-950">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/80 to-neutral-950" />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          
          {/* Gradient Accents */}
          <div 
            className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,136,230,0.5) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10 pointer-events-none"
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
                Enhanced Kango ZE
              </h1>
            </Animated>

            <Animated animation="slide-up" delay={300} duration={1200} distance={60} triggerOnce>
              <p className="text-xl md:text-2xl text-neutral-300 font-light mb-6">
                Extended Range. Enhanced Performance. Smarter Driving.
              </p>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12">
                Unlock the full potential of your Renault Kangoo ZE with our advanced battery upgrade solutions. 
                Extended range, improved performance, and smart BMS technology – everything you need for a seamless 
                and efficient driving experience.
              </p>
            </Animated>

            {/* Feature Preview */}
            <Animated animation="zoom-in" delay={450} duration={1000} triggerOnce>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                <div className="p-6 rounded-2xl bg-neutral-800/30 border border-neutral-700/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-gradient mb-2">2x</div>
                  <div className="text-neutral-400 text-sm">Extended Range</div>
                </div>
                <div className="p-6 rounded-2xl bg-neutral-800/30 border border-neutral-700/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-gradient mb-2">Smart</div>
                  <div className="text-neutral-400 text-sm">BMS Technology</div>
                </div>
                <div className="p-6 rounded-2xl bg-neutral-800/30 border border-neutral-700/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-gradient mb-2">Pro</div>
                  <div className="text-neutral-400 text-sm">Performance Upgrade</div>
                </div>
              </div>
            </Animated>

            {/* Animated Icon */}
            <Animated animation="bounce-in" delay={500} duration={1200} triggerOnce>
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-12">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/10 animate-pulse-gentle" />
                <div className="relative w-24 h-24 rounded-full bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
            </Animated>

            <Animated animation="slide-up" delay={600} duration={1000} triggerOnce>
              <p className="text-neutral-500 mb-8">
                We&apos;re working hard to bring you the best Kango ZE enhancement solutions. 
                Sign up to be notified when this product launches.
              </p>
            </Animated>

            <Animated animation="zoom-in" delay={700} duration={900} triggerOnce>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#contact">
                  <Button variant="primary" size="xl" className="hover-icon-shift animate-glow-slow">
                    <span>Get Notified</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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


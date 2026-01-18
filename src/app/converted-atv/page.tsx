"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animated } from "@/components/ui/animated";
import { Section, SectionHeader } from "@/components/ui/section";
import { PageLoader } from "@/components/ui/page-loader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { handleSectionNavigation, handleInitialHash } from "@/lib/navigation";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Up to 16 kW motors",
    description: "High-performance electric motors delivering instant torque",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Battery body */}
        <rect x="4" y="8" width="14" height="10" rx="1.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        {/* Battery terminal/tip */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 11h2a1 1 0 011 1v2a1 1 0 01-1 1h-2" />
        {/* Battery level bars */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11v4M10 11v4M13 11v4M15.5 11v4" />
      </svg>
    ),
    title: "Up to 10 kWh battery",
    description: "High-density lithium-ion battery packs for extended range",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Up to 120 km range",
    description: "Go further on a single charge with optimized efficiency",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "24/7 Cloud Connectivity",
    description: "Real-time monitoring and remote diagnostics",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "CAN Bus Integration",
    description: "Seamless communication between all vehicle systems",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Digital Display",
    description: "Integrated dashboard with real-time vehicle data",
  },
];

const conversionSteps = [
  {
    step: "01",
    title: "Remove the gasoline engine",
    description: "Carefully extract the combustion engine and related components",
  },
  {
    step: "02",
    title: "Model 3D parts for conversion",
    description: "Custom design mounting brackets and adapters using CAD",
  },
  {
    step: "03",
    title: "Wiring",
    description: "Install high-voltage wiring and control systems",
  },
  {
    step: "04",
    title: "Software Configuration",
    description: "Program the ECU for optimal performance and efficiency",
  },
  {
    step: "05",
    title: "Component Test",
    description: "Rigorous testing of all systems before delivery",
  },
];

// Will be replaced with models from database in the future

const models = [
  {
    name: "EonTrail",
    tagline: "Entry-Level Adventure",
    description: "Built for smooth off-road adventures, the EonTrail delivers steady performance with dependable power. With a balanced top speed and solid range, it's the ideal choice for explorers who value reliability and control.",
    specs: {
      battery: "2.88 kWh",
      power: "5 hp",
      range: "up to 58 km",
    },
    price: "€3,093",
    priceBGN: "6,050 BGN",
    badge: "Popular",
    badgeVariant: "cloud-solid" as const,
    featured: false,
    image: "/EonTrail.png",
    storeUrl: "https://store.iemt-lab.com/products/eontrail-electric-atv",
  },
  {
    name: "HyperGlide",
    tagline: "Performance Balance",
    description: "HyperGlide combines speed, endurance, and smart connectivity in one well-balanced ride. Fast charging and real-time monitoring make it the perfect mix of thrill and efficiency for everyday adventures.",
    specs: {
      battery: "4.32 kWh",
      power: "11 hp",
      range: "up to 90 km",
    },
    price: "€6,243",
    priceBGN: "12,210 BGN",
    badge: "Best Value",
    badgeVariant: "eco-solid" as const,
    featured: true,
    image: "/HyperGlide.png",
    storeUrl: "https://store.iemt-lab.com/products/hyperglide-electric-atv",
  },
  {
    name: "TitanVolt",
    tagline: "Maximum Power",
    description: "Engineered for extreme performance, TitanVolt dominates with unmatched speed and range. Backed by intelligent cloud connectivity, it's the ultimate ride for those who demand maximum power and control.",
    specs: {
      battery: "10.8 kWh",
      power: "21 hp",
      range: "up to 200 km",
    },
    price: "€9,243",
    priceBGN: "18,078 BGN",
    badge: "Premium",
    badgeVariant: "secondary-solid" as const,
    featured: false,
    image: "/TitanVolt.png",
    storeUrl: "https://store.iemt-lab.com/products/titanvolt-electric-atv",
  },
];

// Core components with positions mapped to the image lines
// Using percentage positions relative to the image (top/left from image bounds)
// Image aspect ratio is approximately 1.18:1 (width:height)
const coreComponents = [
  { 
    name: "Display", 
    description: "Digital dashboard",
    // Top line - at the top of handlebars
    top: 6,
    left: 2,
  },
  { 
    name: "Charging Port", 
    description: "Universal connector",
    // Second line - upper right area
    top: 6,
    left: 68,
  },
  { 
    name: "ECU", 
    description: "Electronic Control Unit",
    // Third line - middle left
    top: 29,
    left: 1,
  },
  { 
    name: "Battery", 
    description: "High-density lithium-ion",
    // Fourth line - lower left
    top: 44,
    left: 1,
  },
  { 
    name: "Electric Motor", 
    description: "Mid-drive BLDC motor",
    // Bottom line - bottom center-right
    top: 86,
    left: 58,
  },
];

// Critical images to preload for smooth experience
const criticalImages = [
  "/HyperGlide.png",
  "/EonTrail.png",
  "/TitanVolt.png",
  "/Core_Components.png",
  "/logos/full_transparent.svg",
];

export default function ConvertedATVPage() {
  const [highlightedComponent, setHighlightedComponent] = useState<string | null>(null);

  const handleComponentHighlight = (componentName: string) => {
    setHighlightedComponent(componentName);
    // Auto-clear highlight after 1 second
    setTimeout(() => {
      setHighlightedComponent(null);
    }, 1000);
  };

  // Handle hash navigation on initial page load
  useEffect(() => {
    handleInitialHash();
  }, []);

  return (
    <PageLoader imagesToPreload={criticalImages}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-navy-700">
          {/* Background */}
          <div className="absolute inset-0 bg-navy-900">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: "url('/HyperGlide.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-700/60 to-navy-700" />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          
          {/* Gradient Accents - Performance optimized (no blur) */}
          <div 
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255, 107, 53, 0.4) 0%, transparent 60%)' }}
          />
          <div 
            className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(191, 139, 75, 0.3) 0%, transparent 60%)' }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
            <Animated animation="blur-in" duration={1000} distance={30} triggerOnce>
              <Badge variant="power-solid" className="mb-8">
                Electric Conversion
              </Badge>
            </Animated>

            <Animated animation="slide-up" delay={150} duration={1200} distance={80} triggerOnce>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-ice-100 uppercase tracking-widest leading-[1.1] mb-6">
                From Fuel to Electric
              </h1>
            </Animated>

            <Animated animation="slide-up" delay={300} duration={1200} distance={60} triggerOnce>
              <p className="text-xl md:text-2xl lg:text-3xl text-ice-300 font-light mb-4">
                All the power, None of the noise.
              </p>
              <p className="text-lg text-ice-400 max-w-2xl mx-auto mb-12">
                Our mid-drive electric ATV conversion integrates advanced components into a seamless riding experience.
              </p>
            </Animated>

            <Animated animation="zoom-in" delay={500} duration={1000} triggerOnce>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#models">
                  <Button variant="power" size="xl" className="group animate-glow-slow hover-icon-shift text-sm sm:text-base">
                    <span>Explore Models</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </Button>
                </a>
                <a href="#how-it-works">
                  <Button variant="ghost" size="xl" className="group hover-icon-shift text-sm sm:text-base">
                    <span>See How It Works</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </a>
              </div>
            </Animated>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-700 via-navy-700/80 to-transparent pointer-events-none" />
        </section>

        {/* Features Section */}
        <Section id="features" variant="gradient">
          <SectionHeader
            badge="Capabilities"
            title="Electric Conversion Features"
            subtitle="Our conversions come packed with cutting-edge technology for the ultimate electric riding experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Animated
                key={feature.title}
                animation="slide-up"
                delay={index * 100}
                duration={900}
                distance={50}
                triggerOnce
              >
                <div className="group p-6 rounded-lg bg-navy-800/60 border border-navy-600/30 hover:bg-navy-800/80 hover:border-amber-500/30 transition-colors duration-300 hover-lift">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-power/15 to-amber-500/5 text-power group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-ice-100 mb-2 group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-ice-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Animated>
            ))}
          </div>
        </Section>

        {/* Core Components Section - Interactive Image Map */}
        <Section id="core-components" variant="dark">
          <SectionHeader
            badge="Technology"
            title="Core: Electric Power"
            subtitle="Every conversion is built around these essential components, engineered for reliability and performance."
          />

          <Animated animation="zoom-in" duration={1000} triggerOnce>
            {/* Outer wrapper with extra padding to prevent label cutoff and scrollbars */}
            <div className="flex justify-center px-8 py-4 md:px-10 md:py-6 lg:px-4 overflow-hidden">
              {/* 
                Interactive Image Container
                Responsive sizing: smaller on mobile, larger on desktop
                Image is the positioning context, labels use % positions
              */}
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl">
                {/* ATV Image */}
                <Image 
                  src="/Core_Components.png" 
                  alt="Electric ATV Core Components"
                  width={800}
                  height={600}
                  className="block w-full h-auto"
                  quality={85}
                  priority
                />
                
                {/* Component Labels - absolutely positioned over image */}
                {coreComponents.map((component, index) => {
                  const isHighlighted = highlightedComponent === component.name;
                  return (
                    <Animated
                      key={component.name}
                      animation="zoom-in"
                      delay={300 + index * 100}
                      duration={800}
                      triggerOnce
                      className="absolute"
                      style={{ 
                        top: `${component.top}%`, 
                        left: `${component.left}%`,
                      }}
                    >
                      <div className="group cursor-pointer">
                        <div className={`
                          flex items-center gap-1.5 sm:gap-2
                          px-2 py-1 sm:px-3 sm:py-1.5 md:px-3.5 md:py-2
                          rounded-md
                          shadow-lg
                          transition-all duration-300
                          hover:bg-navy-800 hover:border-amber-400 
                          md:hover:scale-105
                          whitespace-nowrap
                          ${isHighlighted 
                            ? 'bg-amber-500/95 border-2 border-amber-300 shadow-2xl shadow-amber-500/60 scale-110' 
                            : 'bg-navy-900/95 border border-amber-500/50 shadow-black/40 hover:shadow-xl hover:shadow-amber-500/25'
                          }
                        `}>
                          {/* Icon */}
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                            isHighlighted 
                              ? 'bg-white/30' 
                              : 'bg-gradient-to-br from-amber-500/30 to-power/20'
                          }`}>
                            <svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 transition-colors duration-300 ${
                              isHighlighted ? 'text-white' : 'text-amber-400'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          {/* Text */}
                          <div className="flex flex-col">
                            <span className={`font-semibold text-[10px] sm:text-[11px] md:text-xs leading-tight transition-colors duration-300 ${
                              isHighlighted ? 'text-white' : 'text-ice-100'
                            }`}>
                              {component.name}
                            </span>
                            <span className={`text-[8px] sm:text-[9px] md:text-[10px] leading-tight hidden sm:block transition-colors duration-300 ${
                              isHighlighted ? 'text-white/90' : 'text-ice-400'
                            }`}>
                              {component.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Animated>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Component List (for very small screens) - Tap to highlight */}
            <div className="mt-6 px-4 sm:hidden">
              <p className="text-center text-ice-400 text-xs mb-3">Tap a component to highlight it on the image</p>
              <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                {coreComponents.map((component) => {
                  const isHighlighted = highlightedComponent === component.name;
                  return (
                    <button
                      key={`mobile-${component.name}`}
                      onClick={() => handleComponentHighlight(component.name)}
                      className={`
                        flex items-center gap-2 p-2.5 rounded-lg
                        transition-all duration-300 active:scale-95
                        ${isHighlighted 
                          ? 'bg-amber-500/90 border-2 border-amber-300 shadow-lg shadow-amber-500/30' 
                          : 'bg-navy-800/50 border border-navy-600/30 hover:bg-navy-800/70 hover:border-amber-500/30'
                        }
                      `}
                    >
                      <div className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isHighlighted 
                          ? 'bg-white/30' 
                          : 'bg-gradient-to-br from-power/30 to-amber-500/20'
                      }`}>
                        <svg className={`w-3.5 h-3.5 transition-colors duration-300 ${
                          isHighlighted ? 'text-white' : 'text-amber-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className={`font-semibold text-[10px] block transition-colors duration-300 ${
                          isHighlighted ? 'text-white' : 'text-ice-100'
                        }`}>{component.name}</span>
                        <span className={`text-[8px] transition-colors duration-300 ${
                          isHighlighted ? 'text-white/90' : 'text-ice-500'
                        }`}>{component.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Animated>
        </Section>

        {/* How It Works Section */}
        <Section id="how-it-works" variant="gradient">
          <SectionHeader
            badge="Process"
            title="How Electric Conversion Works"
            subtitle="Our expert team follows a rigorous 5-step process to transform your ATV."
          />

          <div className="max-w-6xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden md:block relative">
              {/* Connector line - full width behind all steps */}
              <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500/40 to-amber-500/20" />
              
              <div className="grid grid-cols-5 gap-4">
                {conversionSteps.map((step, index) => (
                  <Animated
                    key={step.step}
                    animation="flip-up"
                    delay={index * 120}
                    duration={900}
                    distance={60}
                    triggerOnce
                  >
                    <div className="relative group flex flex-col items-center text-center">
                      {/* Step number circle */}
                      <div className="relative z-10 mb-6">
                        <div className="w-24 h-24 rounded-xl bg-navy-900 border-2 border-navy-600/60 flex items-center justify-center group-hover:border-amber-500/60 group-hover:bg-navy-900/80 transition-all duration-500 shadow-lg shadow-navy-900/50">
                          <span className="text-3xl font-bold text-gradient font-mono">{step.step}</span>
                        </div>
                        {/* Glow effect on hover - shadow instead of blur */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 shadow-[0_0_30px_rgba(245,158,11,0.3)]" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-sm font-semibold text-ice-100 mb-2 group-hover:text-amber-400 transition-colors leading-tight min-h-[40px] flex items-center">
                        {step.title}
                      </h3>
                      <p className="text-ice-500 text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Animated>
                ))}
              </div>
            </div>

            {/* Mobile Layout - Vertical timeline */}
            <div className="md:hidden relative">
              {/* Vertical connector line */}
              <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-amber-500/40" />
              
              <div className="space-y-8">
                {conversionSteps.map((step, index) => (
                  <Animated
                    key={step.step}
                    animation="slide-up"
                    delay={index * 100}
                    duration={800}
                    distance={40}
                    triggerOnce
                  >
                    <div className="relative flex items-start gap-6 group">
                      {/* Step number */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg bg-navy-900 border-2 border-navy-600/60 flex items-center justify-center group-hover:border-amber-500/60 transition-all duration-300 shadow-lg">
                          <span className="text-xl font-bold text-gradient font-mono">{step.step}</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="pt-2">
                        <h3 className="text-base font-semibold text-ice-100 mb-1 group-hover:text-amber-400 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-ice-500 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Animated>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Models Section */}
        <Section id="models" variant="dark">
          <SectionHeader
            badge="Choose Your Ride"
            title="Model Configurations"
            subtitle="Select the perfect configuration for your riding style and needs."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <Animated
                key={model.name}
                animation="slide-up"
                delay={index * 150}
                duration={1000}
                distance={70}
                triggerOnce
              >
                <div className={`relative group rounded-2xl overflow-visible transition-all duration-500 hover-lift mt-4 ${
                  model.featured 
                    ? 'bg-gradient-to-b from-amber-500/10 via-navy-800/50 to-navy-900/50 border-2 border-amber-500/30' 
                    : 'bg-navy-800/30 border border-navy-600/30 hover:border-amber-500/20'
                }`}>
                  {/* Badge - positioned halfway through top */}
                  <Badge 
                    variant={model.badgeVariant}
                    className="absolute -top-3 right-6 z-10 px-4 py-1.5"
                  >
                      {model.badge}
                    </Badge>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <div 
                      className="absolute inset-0 bg-center bg-no-repeat bg-[length:70%] md:bg-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${model.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold text-ice-100 group-hover:text-amber-400 transition-colors">
                        {model.name}
                      </h3>
                      <p className="text-amber-400 text-sm font-medium">{model.tagline}</p>
                    </div>

                    <p className="text-ice-400 text-sm leading-relaxed mb-6">
                      {model.description}
                    </p>

                    {/* Specs - Using monospace per spec */}
                    <div className="space-y-3 mb-6 p-4 rounded-lg bg-navy-900/50 border border-navy-700/50">
                      <div className="flex justify-between items-center">
                        <span className="text-ice-500 text-sm">Battery</span>
                        <span className="text-ice-100 font-mono font-medium">{model.specs.battery}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-ice-500 text-sm">Power</span>
                        <span className="text-ice-100 font-mono font-medium">{model.specs.power}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-ice-500 text-sm">Range</span>
                        <span className="text-ice-100 font-mono font-medium">{model.specs.range}</span>
                      </div>
                    </div>

                    {/* Price - Monospace for prices per spec */}
                    <div className="mb-6">
                      <div className="text-sm text-ice-500 mb-1">Starting price</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gradient font-mono">{model.price}</span>
                        <span className="text-ice-500 text-sm font-mono">/ {model.priceBGN}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3 flex flex-col">
                      <a href="https://store.iemt-lab.com" target="_blank" rel="noopener noreferrer">
                        <Button 
                          variant={model.featured ? "secondary" : "power"} 
                          size="lg" 
                          className="w-full hover-icon-shift text-sm sm:text-base"
                        >
                          <span>Shop Now</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Button>
                      </a>
                      <a href={model.storeUrl} target="_blank" rel="noopener noreferrer">
                        <Button 
                          variant="ghost" 
                          size="lg" 
                          className="w-full hover-icon-shift text-sm sm:text-base"
                        >
                          <span>Configure Your ATV</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </Animated>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section variant="gradient">
          <div className="text-center max-w-3xl mx-auto">
            <Animated animation="slide-up" duration={1000} triggerOnce>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ice-100 uppercase tracking-wider mb-6">
                Ready to Go Electric?
              </h2>
              <p className="text-lg text-ice-400 mb-10">
                Contact us today for a custom quote on your ATV conversion. Our team will guide you through every step of the process.
              </p>
            </Animated>
            
            <Animated animation="zoom-in" delay={200} duration={900} triggerOnce>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#contact" onClick={(e) => handleSectionNavigation(e, "/#contact")}>
                  <Button variant="secondary" size="xl" className="hover-icon-shift animate-glow-slow text-sm sm:text-base">
                    <span>Get a Quote</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/" onClick={(e) => handleSectionNavigation(e, "/")}>
                  <Button variant="ghost" size="xl" className="hover-icon-shift text-sm sm:text-base">
                    <span>Back to Home</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </Animated>
          </div>
        </Section>
      </main>
      <Footer />
    </PageLoader>
  );
}

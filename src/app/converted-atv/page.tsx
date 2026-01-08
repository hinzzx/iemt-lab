"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animated } from "@/components/ui/animated";
import { Section, SectionHeader } from "@/components/ui/section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
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
    featured: false,
    image: "/EonTrail.png",
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
    featured: true,
    image: "/HyperGlide.png",
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
    featured: false,
    image: "/TitanVolt.png",
  },
];

const coreComponents = [
  { name: "ECU", description: "Electronic Control Unit" },
  { name: "Battery", description: "High-density lithium-ion" },
  { name: "Display", description: "Digital dashboard" },
  { name: "Electric Motor", description: "Mid-drive BLDC motor" },
  { name: "Charging Port", description: "Universal connector" },
];

export default function ConvertedATVPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background */}
          <div className="absolute inset-0 bg-neutral-950">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: "url('/HyperGlide.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/60 to-neutral-950" />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          
          {/* Gradient Accents */}
          <div 
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px] opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,136,230,0.6) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(240,140,0,0.5) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
            <Animated animation="blur-in" duration={1000} distance={30} triggerOnce>
              <Badge variant="secondary" className="mb-8">
                Electric Conversion
              </Badge>
            </Animated>

            <Animated animation="slide-up" delay={150} duration={1200} distance={80} triggerOnce>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                From Fuel to Electric
              </h1>
            </Animated>

            <Animated animation="slide-up" delay={300} duration={1200} distance={60} triggerOnce>
              <p className="text-xl md:text-2xl lg:text-3xl text-neutral-300 font-light mb-4">
                All the power, None of the noise.
              </p>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12">
                Our mid-drive electric ATV conversion integrates advanced components into a seamless riding experience.
              </p>
            </Animated>

            <Animated animation="zoom-in" delay={500} duration={1000} triggerOnce>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#models">
                  <Button variant="primary" size="xl" className="group animate-glow-slow hover-icon-shift">
                    <span>Explore Models</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </Button>
                </a>
                <a href="#how-it-works">
                  <Button variant="ghost" size="xl" className="group hover-icon-shift">
                    <span>See How It Works</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </a>
              </div>
            </Animated>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none" />
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
                <div className="group p-6 rounded-2xl bg-neutral-800/20 border border-neutral-700/20 backdrop-blur-sm hover:bg-neutral-800/40 hover:border-primary-500/20 transition-all duration-500 hover-lift">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary-500/15 to-secondary-500/5 text-primary-400 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Animated>
            ))}
          </div>
        </Section>

        {/* Core Components Section */}
        <Section variant="dark">
          <SectionHeader
            badge="Technology"
            title="Core: Electric Power"
            subtitle="Every conversion is built around these essential components, engineered for reliability and performance."
          />

          <div className="max-w-4xl mx-auto">
            <Animated animation="zoom-in" duration={1000} triggerOnce>
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-neutral-700/30 backdrop-blur-sm">
                {/* Central illustration placeholder */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {coreComponents.map((component, index) => (
                    <Animated
                      key={component.name}
                      animation="bounce-in"
                      delay={index * 100}
                      duration={800}
                      triggerOnce
                    >
                      <div className="flex flex-col items-center p-4 md:p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700/30 hover:border-primary-500/30 hover:bg-neutral-800/70 transition-all duration-300 group">
                        <div className="w-16 h-16 md:w-20 md:h-20 mb-3 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="text-white font-semibold text-sm md:text-base">{component.name}</span>
                        <span className="text-neutral-500 text-xs mt-1">{component.description}</span>
                      </div>
                    </Animated>
                  ))}
                </div>
              </div>
            </Animated>
          </div>
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
              <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary-500/20 via-primary-500/40 to-primary-500/20" />
              
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
                        <div className="w-24 h-24 rounded-2xl bg-neutral-900 border-2 border-neutral-700/60 flex items-center justify-center group-hover:border-primary-500/60 group-hover:bg-neutral-900/80 transition-all duration-500 shadow-lg shadow-neutral-950/50">
                          <span className="text-3xl font-bold text-gradient">{step.step}</span>
                        </div>
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-sm font-bold text-white mb-2 group-hover:text-primary-400 transition-colors leading-tight min-h-[40px] flex items-center">
                        {step.title}
                      </h3>
                      <p className="text-neutral-500 text-xs leading-relaxed">
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
              <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary-500/40 via-primary-500/20 to-primary-500/40" />
              
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
                        <div className="w-16 h-16 rounded-xl bg-neutral-900 border-2 border-neutral-700/60 flex items-center justify-center group-hover:border-primary-500/60 transition-all duration-300 shadow-lg">
                          <span className="text-xl font-bold text-gradient">{step.step}</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="pt-2">
                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">
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
                <div className={`relative group rounded-3xl overflow-hidden transition-all duration-500 hover-lift ${
                  model.featured 
                    ? 'bg-gradient-to-b from-primary-500/10 via-neutral-800/50 to-neutral-900/50 border-2 border-primary-500/30' 
                    : 'bg-neutral-800/30 border border-neutral-700/30 hover:border-primary-500/20'
                }`}>
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant={model.featured ? "primary" : "secondary"}>
                      {model.badge}
                    </Badge>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${model.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                        {model.name}
                      </h3>
                      <p className="text-primary-400 text-sm font-medium">{model.tagline}</p>
                    </div>

                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      {model.description}
                    </p>

                    {/* Specs */}
                    <div className="space-y-3 mb-6 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500 text-sm">Battery</span>
                        <span className="text-white font-mono font-medium">{model.specs.battery}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500 text-sm">Power</span>
                        <span className="text-white font-mono font-medium">{model.specs.power}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500 text-sm">Range</span>
                        <span className="text-white font-mono font-medium">{model.specs.range}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-sm text-neutral-500 mb-1">Starting price</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gradient">{model.price}</span>
                        <span className="text-neutral-500 text-sm">/ {model.priceBGN}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3 flex flex-col">
                      <a href="https://www.iemt-lab.com/store" target="_blank" rel="noopener noreferrer">
                        <Button 
                          variant={model.featured ? "primary" : "secondary"} 
                          size="lg" 
                          className="w-full hover-icon-shift"
                        >
                          <span>Shop Now</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Button>
                      </a>
                      <Link href="/configurator">
                        <Button 
                          variant="ghost" 
                          size="lg" 
                          className="w-full hover-icon-shift"
                        >
                          <span>Configure Your ATV</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </Button>
                      </Link>
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Go Electric?
              </h2>
              <p className="text-lg text-neutral-400 mb-10">
                Contact us today for a custom quote on your ATV conversion. Our team will guide you through every step of the process.
              </p>
            </Animated>
            
            <Animated animation="zoom-in" delay={200} duration={900} triggerOnce>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#contact">
                  <Button variant="primary" size="xl" className="hover-icon-shift animate-glow-slow">
                    <span>Get a Quote</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
        </Section>
      </main>
      <Footer />
    </>
  );
}


"use client";

import { Section, SectionHeader } from "@/components/ui/section";
import { Animated } from "@/components/ui/animated";

const aboutItems = [
  {
    id: 1,
    title: "Our Story",
    description: "Our journey began in a small workshop in Sopot, where we created our first electric prototype by converting old Opel Astra into a quiet, long-range EV. This success laid the groundwork for our scalable architecture. Since then, we've provided full electric conversions for various vehicles improved factory EVs while converting combustion vehicles to electric. Today, we partner with more clients seeking enhanced range, performance, and zero-emission solutions, driven by our dedication to rapid prototyping and innovation.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Our Team",
    description: "iEMT Lab brings together electrical engineers, software developers, and automotive builders to create fully integrated electric-drive solutions. From custom motors and battery packs to real-time control software, we handle every stage of vehicle electrification. Whether converting city buses, lightweight cars, or off-road ATVs, we focus on one metric above all: the perfect power-to-range balance that lets drivers enjoy clean performance without compromise.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Our Vision",
    description: "We see vehicle conversion and enhancement as the smartest path to rapid decarbonization. By upgrading existing cars, buses, motors, and ATVs with high-efficiency electric drivetrains and adaptive energy-management software, we extend vehicle life, slash emissions, and erase range anxiety. Our goal is simple: make it easier for cities, businesses, and individuals to choose electrification—so every road trip, commute, and off-road ride moves us toward a cleaner, more exhilarating future.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "100%", label: "Custom Solutions" },
  { value: "∞", label: "Innovation Drive" },
  { value: "0", label: "Emissions" },
  { value: "24/7", label: "Dedication" },
];

export function AboutSection() {
  return (
    <Section
      id="about"
      variant="dark"
      backgroundImage="https://images.unsplash.com/photo-1504222490345-c075b6008014?q=80&w=2070&auto=format&fit=crop"
    >
      <SectionHeader
        badge="Who We Are"
        title="About Us"
        subtitle="From a small workshop to a trusted partner in electric mobility, discover the passion and expertise behind iEMT Lab."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {aboutItems.map((item, index) => (
          <Animated
            key={item.id}
            animation="slide-up"
            delay={index * 150}
            duration={1000}
            distance={70}
          >
            <div className="group relative p-8 rounded-2xl bg-neutral-800/15 border border-neutral-700/15 backdrop-blur-sm transition-all duration-500 hover:bg-neutral-800/30 hover:border-primary-500/20 hover-lift h-full">
              {/* Icon */}
              <Animated animation="zoom-in" delay={index * 150 + 200} duration={800}>
                <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-primary-500/15 to-secondary-500/5 text-primary-400 group-hover:scale-105 group-hover:from-primary-500/25 transition-all duration-400">
                  {item.icon}
                </div>
              </Animated>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-primary-400 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                {item.description}
              </p>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          </Animated>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
        {stats.map((stat, index) => (
          <Animated
            key={stat.label}
            animation="bounce-in"
            delay={index * 120}
            duration={1000}
            distance={50}
          >
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-3 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-[0.15em] group-hover:text-neutral-300 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          </Animated>
        ))}
      </div>
    </Section>
  );
}

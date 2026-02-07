"use client";

import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { CardDark, CardHeader, CardTitleDark, CardDescriptionDark, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animated } from "@/components/ui/animated";

const services = [
  {
    id: 1,
    title: "ATV Conversion",
    description: "Transform your gasoline ATV into a high-performance electric machine. Our mid-drive conversion integrates advanced components for a seamless, powerful riding experience with zero emissions.",
    image: "/Electric_ATV.png",
    badge: "Conversion",
    badgeVariant: "power-solid" as const,
    features: ["Full Electric Conversion", "Custom Wiring & ECU", "Up to 120 km Range"],
    href: "/converted-atv",
  },
  {
    id: 2,
    title: "Enhanced Kango ZE",
    description: "Unlock the full potential of your Renault Kangoo ZE with our advanced battery upgrade solutions. Extended range, improved performance, and smart BMS technology for a superior driving experience.",
    image: "/KangoZE.jpg",
    badge: "Upgrade",
    badgeVariant: "cloud-solid" as const,
    features: ["Extended Range", "Performance+", "Smart BMS"],
    href: "/kangoze-enhanced",
  },
  {
    id: 3,
    title: "Vehicle Conversions",
    description: "Transform your internal combustion engine vehicle into a sustainable, eco-friendly electric vehicle. From cars to buses, we handle full conversions tailored to your needs.",
    image: "/Converted_Bus.png",
    badge: "Custom",
    badgeVariant: "eco-solid" as const,
    features: ["Full Conversion", "Custom Design", "Eco-Friendly"],
    href: "/converted-vehicles",
  },
];

export function ServicesSection() {
  return (
    <Section id="services" variant="gradient">
      <SectionHeader
        badge="What We Do"
        title="Our Services"
        subtitle="From electric ATV conversions to complete vehicle electrification, we deliver cutting-edge solutions tailored to your needs."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Animated
            key={service.id}
            animation="slide-up"
            delay={index * 150}
            duration={900}
            distance={50}
            triggerOnce
          >
            <CardDark className="group overflow-visible h-full flex flex-col relative mt-4 hover-lift">
              {/* Badge - positioned to overlap top edge */}
              <Badge 
                variant={service.badgeVariant} 
                className="absolute -top-3 left-6 z-10 px-4 py-1.5 shadow-sm"
              >
                {service.badge}
              </Badge>

              {/* Image Container */}
              <div className="relative h-56 overflow-hidden rounded-t-xl">
                <div 
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
              </div>

              <CardHeader className="relative">
                <Link href={service.href}>
                  <CardTitleDark className="text-2xl group-hover:text-amber-400 transition-colors duration-200 cursor-pointer">
                    {service.title}
                  </CardTitleDark>
                </Link>
                {/* Refined underline */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescriptionDark className="text-base leading-relaxed mb-6">
                  {service.description}
                </CardDescriptionDark>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 text-xs font-semibold bg-navy-600/65 text-ice-100 rounded-full border border-ice-300/20 group-hover:border-amber-500/30 group-hover:bg-amber-500/12 transition-[background-color,border-color] duration-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Link href={service.href} className="w-full">
                  <Button 
                    variant="ghost" 
                    size="md" 
                    className="w-full hover-icon-shift press-effect"
                  >
                    <span>Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              </CardFooter>
            </CardDark>
          </Animated>
        ))}
      </div>
    </Section>
  );
}

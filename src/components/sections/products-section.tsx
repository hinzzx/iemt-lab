"use client";

import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { CardDark, CardHeader, CardTitleDark, CardDescriptionDark, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animated } from "@/components/ui/animated";

const products = [
  {
    id: 1,
    title: "Electric ATV",
    description: "Experience the thrill of off-road adventures with our electric ATVs. Built for power and agility, our vehicles offer an exhilarating ride through rugged terrains, delivering an unmatched outdoor experience.",
    image: "/Electric_ATV.png",
    badge: "Adventure",
    badgeVariant: "power-solid" as const,
    features: ["Zero Emissions", "High Torque", "All-Terrain"],
    href: "/converted-atv",
  },
  {
    id: 2,
    title: "Enhanced Kango ZE",
    description: "Unlock the full potential of your electric vehicle with our advanced battery upgrade solutions. Elevate your vehicle's performance and range, ensuring a seamless and efficient driving experience.",
    image: "/KangoZE.jpg",
    badge: "Upgrade",
    badgeVariant: "cloud-solid" as const,
    features: ["Extended Range", "Performance+", "Smart BMS"],
    href: "/kangoze-enhanced",
  },
  {
    id: 3,
    title: "Converted Bus & Vehicles",
    description: "Transform your internal combustion engine (ICE) vehicle into a sustainable and eco-friendly electric vehicle. Embrace the future of mobility while contributing to a cleaner and greener environment.",
    image: "/Converted_Bus.png",
    badge: "Conversion",
    badgeVariant: "eco-solid" as const,
    features: ["Full Conversion", "Custom Design", "Eco-Friendly"],
    href: "/converted-vehicles",
  },
];

export function ProductsSection() {
  return (
    <Section id="products" variant="dark">
      <SectionHeader
        badge="What We Offer"
        title="Our Products & Services"
        subtitle="From electric ATVs to complete vehicle conversions, we deliver cutting-edge electric mobility solutions tailored to your needs."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Animated
            key={product.id}
            animation="slide-up"
            delay={index * 100}
            duration={600}
            distance={40}
          >
            <CardDark className="group overflow-visible h-full flex flex-col relative mt-4 hover-lift">
              {/* Badge - positioned to overlap top edge */}
              <Badge 
                variant={product.badgeVariant} 
                className="absolute -top-3 left-6 z-10 px-4 py-1.5 shadow-sm"
              >
                {product.badge}
              </Badge>

              {/* Image Container - Performance optimized */}
              <div className="relative h-56 overflow-hidden rounded-t-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  style={{ 
                    backgroundImage: `url(${product.image})`,
                  }}
                />
                {/* Optimized overlay - less opacity change */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent group-hover:from-navy-900/65 transition-[background-image] duration-200" />
              </div>

              <CardHeader className="relative">
                <CardTitleDark className="text-2xl group-hover:text-amber-400 transition-colors duration-200">
                  {product.title}
                </CardTitleDark>
                {/* Refined underline */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescriptionDark className="text-base leading-relaxed mb-6">
                  {product.description}
                </CardDescriptionDark>

                {/* Features - Optimized transitions */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
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
                <Link href={product.href} className="w-full">
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

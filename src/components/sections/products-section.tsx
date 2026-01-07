"use client";

import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animated } from "@/components/ui/animated";

const products = [
  {
    id: 1,
    title: "Electric ATV",
    description: "Experience the thrill of off-road adventures with our electric ATVs. Built for power and agility, our vehicles offer an exhilarating ride through rugged terrains, delivering an unmatched outdoor experience.",
    image: "/EonTrail.png",
    badge: "Adventure",
    features: ["Zero Emissions", "High Torque", "All-Terrain"],
    href: "/converted-atv",
  },
  {
    id: 2,
    title: "Enhanced Kango ZE",
    description: "Unlock the full potential of your electric vehicle with our advanced battery upgrade solutions. Elevate your vehicle's performance and range, ensuring a seamless and efficient driving experience.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
    badge: "Upgrade",
    features: ["Extended Range", "Performance+", "Smart BMS"],
    href: "/kangoze-enhanced",
  },
  {
    id: 3,
    title: "Converted Bus & Vehicles",
    description: "Transform your internal combustion engine (ICE) vehicle into a sustainable and eco-friendly electric vehicle. Embrace the future of mobility while contributing to a cleaner and greener environment.",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop",
    badge: "Conversion",
    features: ["Full Conversion", "Custom Design", "Eco-Friendly"],
    href: "/converted-vehicles",
  },
];

export function ProductsSection() {
  return (
    <Section id="products" variant="gradient">
      <SectionHeader
        badge="What We Offer"
        title="Our Products & Services"
        subtitle="From electric ATVs to complete vehicle conversions, we deliver cutting-edge electric mobility solutions tailored to your needs."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Animated
            key={product.id}
            animation="flip-up"
            delay={index * 180}
            duration={1000}
            distance={70}
          >
            <Card className="group overflow-hidden h-full flex flex-col">
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center hover-zoom"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                
                {/* Badge */}
                <Badge variant="primary" className="absolute top-4 left-4 shadow-lg">
                  {product.badge}
                </Badge>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <CardHeader className="relative">
                <CardTitle className="text-2xl group-hover:text-primary-400 transition-colors duration-300">
                  {product.title}
                </CardTitle>
                {/* Subtle underline on hover */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-primary-500/40 via-primary-500 to-primary-500/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescription className="text-base leading-relaxed mb-6">
                  {product.description}
                </CardDescription>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, featureIndex) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 text-xs font-medium bg-neutral-700/30 text-neutral-300 rounded-full border border-neutral-600/20 group-hover:border-primary-500/20 group-hover:bg-primary-500/5 transition-all duration-300"
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Link href={product.href} className="w-full">
                  <Button 
                    variant="secondary" 
                    size="md" 
                    className="w-full hover-icon-shift"
                  >
                    <span>Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </Animated>
        ))}
      </div>
    </Section>
  );
}

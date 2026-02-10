"use client";

import { Section, SectionHeader } from "@/components/ui/section";
import { CardDark, CardHeader, CardTitleDark, CardDescriptionDark, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animated } from "@/components/ui/animated";
import { usePrices } from "@/lib/use-prices";

const products = [
  {
    id: 1,
    name: "EonTrail",
    tagline: "Entry-Level Adventure",
    description: "Built for smooth off-road adventures, the EonTrail delivers steady performance with dependable power. The ideal choice for explorers who value reliability and control.",
    image: "/EonTrail.png",
    imageClass: "bg-[length:45%] md:bg-[length:70%]",
    badge: "Popular",
    badgeVariant: "cloud-solid" as const,
    specs: {
      battery: "2.88 kWh",
      power: "5 hp",
      range: "up to 58 km",
    },
    price: "€3,093",
    priceBGN: "6,050 BGN",
    featured: false,
    handle: "eontrail-electric-atv",
    storeUrl: "https://store.iemt-lab.com/products/eontrail-electric-atv",
  },
  {
    id: 2,
    name: "HyperGlide",
    tagline: "Performance Balance",
    description: "HyperGlide combines speed, endurance, and smart connectivity in one well-balanced ride. The perfect mix of thrill and efficiency for everyday adventures.",
    image: "/HyperGlide.png",
    badge: "Best Value",
    badgeVariant: "eco-solid" as const,
    specs: {
      battery: "4.32 kWh",
      power: "11 hp",
      range: "up to 90 km",
    },
    price: "€6,250",
    priceBGN: "12,224 BGN",
    featured: true,
    handle: "hyperglide-electric-atv",
    storeUrl: "https://store.iemt-lab.com/products/hyperglide-electric-atv",
  },
  {
    id: 3,
    name: "TitanVolt",
    tagline: "Maximum Power",
    description: "Engineered for extreme performance, TitanVolt dominates with unmatched speed and range. The ultimate ride for those who demand maximum power and control.",
    image: "/TitanVolt.png",
    badge: "Premium",
    badgeVariant: "secondary-solid" as const,
    specs: {
      battery: "10.8 kWh",
      power: "21 hp",
      range: "up to 200 km",
    },
    price: "€9,300",
    priceBGN: "18,189 BGN",
    featured: false,
    handle: "titanvolt-electric-atv",
    storeUrl: "https://store.iemt-lab.com/products/titanvolt-electric-atv",
  },
];

export function ProductsSection() {
  const prices = usePrices();

  return (
    <Section id="products" variant="dark">
      <SectionHeader
        badge="Our Electric ATVs"
        title="Products"
        subtitle="Purpose-built electric ATVs designed for performance, reliability, and zero emissions. Choose the model that matches your riding style."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Animated
            key={product.id}
            animation="slide-up"
            delay={index * 150}
            duration={900}
            distance={50}
            triggerOnce
          >
            <CardDark className={`group overflow-visible h-full flex flex-col relative mt-4 hover-lift ${product.featured ? 'ring-2 ring-amber-500/30' : ''}`}>
              {/* Badge - positioned to overlap top edge */}
              <Badge 
                variant={product.badgeVariant} 
                className="absolute -top-3 left-6 z-10 px-4 py-1.5 shadow-sm"
              >
                {product.badge}
              </Badge>

              {/* Image Container */}
              <div className="relative h-56 overflow-hidden rounded-t-xl">
                <div 
                  className={`absolute inset-0 bg-center bg-no-repeat bg-[length:70%] md:bg-cover transition-transform duration-700 group-hover:scale-110 ${product.imageClass || ''}`}
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
              </div>

              <CardHeader className="relative">
                <a href={product.storeUrl} target="_blank" rel="noopener noreferrer">
                  <CardTitleDark className="text-2xl group-hover:text-amber-400 transition-colors duration-200 cursor-pointer">
                    {product.name}
                  </CardTitleDark>
                </a>
                <p className="text-amber-400 text-sm font-medium mt-1">{product.tagline}</p>
                {/* Refined underline */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescriptionDark className="text-base leading-relaxed mb-6">
                  {product.description}
                </CardDescriptionDark>

                {/* Specs */}
                <div className="space-y-2.5 mb-6 p-4 rounded-lg bg-navy-900/50 border border-navy-700/50">
                  <div className="flex justify-between items-center">
                    <span className="text-ice-500 text-sm">Battery</span>
                    <span className="text-ice-100 font-mono font-medium text-sm">{product.specs.battery}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ice-500 text-sm">Power</span>
                    <span className="text-ice-100 font-mono font-medium text-sm">{product.specs.power}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ice-500 text-sm">Range</span>
                    <span className="text-ice-100 font-mono font-medium text-sm">{product.specs.range}</span>
                  </div>
                </div>

                {/* Price - live from Shopify or hardcoded fallback */}
                <div className="mb-2">
                  <div className="text-xs text-ice-500 mb-1">Starting from</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gradient font-mono">
                      {prices?.[product.handle]?.formatted ?? product.price}
                    </span>
                    <span className="text-ice-500 text-xs font-mono">
                      / {prices?.[product.handle]?.formattedBGN ?? product.priceBGN}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <a href={product.storeUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button 
                    variant={product.featured ? "secondary" : "power"} 
                    size="md" 
                    className="w-full hover-icon-shift press-effect"
                  >
                    <span>Shop Now</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </a>
                <a href={product.storeUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button 
                    variant="ghost" 
                    size="md" 
                    className="w-full hover-icon-shift press-effect"
                  >
                    <span>Configure</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </Button>
                </a>
              </CardFooter>
            </CardDark>
          </Animated>
        ))}
      </div>

      {/* Shop CTA */}
      <Animated animation="fade" delay={500} duration={800} triggerOnce>
        <div className="mt-12 text-center">
          <a href="https://store.iemt-lab.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="lg" className="hover-icon-shift">
              <span>Visit Our Shop</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Button>
          </a>
        </div>
      </Animated>
    </Section>
  );
}

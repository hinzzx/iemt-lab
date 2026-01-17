"use client";

import { Header, Footer } from "@/components/layout";
import { HeroSection, ProductsSection, AboutSection, ContactSection } from "@/components/sections";
import { PageLoader } from "@/components/ui";

// Critical images to preload for smooth experience
const criticalImages = [
  "/hero-background.png",
  "/logos/full_transparent.svg",
  "/Electric_ATV.png",
  "/Converted_Bus.png",
  "/KangoZE.jpg",
];

export default function Home() {
  return (
    <PageLoader imagesToPreload={criticalImages}>
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </PageLoader>
  );
}

import { Header, Footer } from "@/components/layout";
import { HeroSection, ProductsSection, ServicesSection, AboutSection, ContactSection } from "@/components/sections";
import { PageLoader } from "@/components/ui";

// Critical images to preload for smooth experience
const criticalImages = [
  "/hero-background.png",
  "/logos/full_transparent.svg",
  "/EonTrail.png",
  "/HyperGlide.png",
  "/TitanVolt.png",
];

export default function Home() {
  return (
    <PageLoader imagesToPreload={criticalImages}>
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </PageLoader>
  );
}

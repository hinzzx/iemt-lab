import { Header, Footer } from "@/components/layout";
import { HeroSection, ProductsSection, AboutSection, ContactSection } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

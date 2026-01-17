import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "iEMT Lab | Electric Motor Technology Laboratory",
  description: "Advancing Tomorrow: Innovating Electric Motors for a Transformative Experience. Electric ATVs, vehicle conversions, and enhanced EV solutions.",
  keywords: ["electric vehicles", "EV conversion", "electric ATV", "electric motors", "Bulgaria", "iEMT Lab"],
  authors: [{ name: "iEMT Lab" }],
  openGraph: {
    title: "iEMT Lab | Electric Motor Technology Laboratory",
    description: "Advancing Tomorrow: Innovating Electric Motors for a Transformative Experience.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${montserrat.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

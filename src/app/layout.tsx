import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
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
        className={`${dmSans.variable} ${ibmPlexMono.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

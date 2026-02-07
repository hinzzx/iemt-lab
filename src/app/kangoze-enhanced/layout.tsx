import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enhanced Kango ZE | iEMT Lab",
  description: "Unlock the full potential of your Renault Kangoo ZE with our advanced battery upgrade solutions. Extended range, improved performance, and smart BMS technology.",
  openGraph: {
    title: "Enhanced Kango ZE | iEMT Lab",
    description: "Extended range, improved performance, and smart BMS technology for your Renault Kangoo ZE.",
    type: "website",
  },
};

export default function KangoZELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

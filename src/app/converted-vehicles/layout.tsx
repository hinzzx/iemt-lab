import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Conversions | iEMT Lab",
  description: "Transform your internal combustion engine vehicle into a sustainable electric vehicle. From cars to buses, we handle full conversions tailored to your needs.",
  openGraph: {
    title: "Vehicle Conversions | iEMT Lab",
    description: "Convert your ICE vehicle to electric. Cars, vans, buses, and custom conversions.",
    type: "website",
  },
};

export default function ConvertedVehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

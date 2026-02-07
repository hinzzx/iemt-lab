import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ATV Electric Conversion | iEMT Lab",
  description: "Transform your gasoline ATV into a high-performance electric machine. Our mid-drive conversion integrates advanced components — up to 16 kW motors, 10 kWh battery, and 120 km range.",
  openGraph: {
    title: "ATV Electric Conversion | iEMT Lab",
    description: "Transform your gasoline ATV into a high-performance electric machine with zero emissions.",
    type: "website",
  },
};

export default function ConvertedATVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

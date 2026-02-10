import { NextResponse } from "next/server";
import { fetchShopifyPrices } from "@/lib/shopify";

// ISR: revalidate the cached response every hour
export const revalidate = 3600;

export async function GET() {
  try {
    const prices = await fetchShopifyPrices();

    return NextResponse.json(
      { prices },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("[/api/prices] Failed to fetch Shopify prices:", error);

    return NextResponse.json(
      { prices: null, error: "Failed to fetch prices" },
      { status: 502 },
    );
  }
}

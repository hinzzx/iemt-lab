import { NextResponse } from "next/server";
import { fetchShopifyPrices, type PriceMap } from "@/lib/shopify";

// ISR: revalidate the cached response every 60 seconds
export const revalidate = 60;

// ---------------------------------------------------------------------------
// In-memory stale cache — survives Shopify outages
// ---------------------------------------------------------------------------
let lastGoodPrices: PriceMap | null = null;
let lastFetchedAt: number = 0;

export async function GET() {
  try {
    const prices = await fetchShopifyPrices();

    // Store as last-known-good for resilience
    lastGoodPrices = prices;
    lastFetchedAt = Date.now();

    return NextResponse.json(
      { prices, stale: false },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("[/api/prices] Failed to fetch Shopify prices:", error);

    // If Shopify is down, serve the last successful response
    if (lastGoodPrices) {
      const staleSec = Math.round((Date.now() - lastFetchedAt) / 1000);
      console.warn(
        `[/api/prices] Serving stale prices (${staleSec}s old) due to Shopify error`,
      );

      return NextResponse.json(
        { prices: lastGoodPrices, stale: true },
        {
          headers: {
            // Short cache so we retry Shopify soon
            "Cache-Control": "public, s-maxage=10, stale-while-revalidate=60",
          },
        },
      );
    }

    // No cached data at all — let the client fall back to hardcoded prices
    return NextResponse.json(
      { prices: null, error: "Failed to fetch prices" },
      { status: 502 },
    );
  }
}

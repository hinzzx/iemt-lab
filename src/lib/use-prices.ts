"use client";

import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProductPrice {
  formatted: string;
  formattedBGN: string;
}

export type PriceMap = Record<string, ProductPrice>;

// ---------------------------------------------------------------------------
// Module-level dedup — prevents parallel fetches from multiple components
// on the same page, but always refetches on a new page navigation.
// ---------------------------------------------------------------------------

let activeFetch: Promise<PriceMap | null> | null = null;

async function fetchPrices(): Promise<PriceMap | null> {
  try {
    const res = await fetch("/api/prices");
    if (!res.ok) return null;
    const data = await res.json();
    return data.prices ?? null;
  } catch {
    return null;
  } finally {
    // Clear the dedup lock so the next page navigation refetches
    activeFetch = null;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Fetches live product prices from the Shopify Storefront API (via /api/prices).
 *
 * - Returns `null` while loading or if the fetch fails.
 * - Components should use hardcoded prices as fallback:
 *   `prices?.[handle]?.formatted ?? fallbackPrice`
 * - Deduplicates concurrent calls on the same page but refetches on every
 *   new page navigation so prices stay fresh.
 */
export function usePrices(): PriceMap | null {
  const [prices, setPrices] = useState<PriceMap | null>(null);

  useEffect(() => {
    // Deduplicate concurrent fetches from multiple components on the same page
    if (!activeFetch) {
      activeFetch = fetchPrices();
    }

    let cancelled = false;

    activeFetch.then((result) => {
      if (!cancelled) {
        setPrices(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return prices;
}

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
// Module-level cache — shared across all components that call usePrices()
// ---------------------------------------------------------------------------

let cachedPrices: PriceMap | null = null;
let fetchPromise: Promise<PriceMap | null> | null = null;

async function fetchPrices(): Promise<PriceMap | null> {
  try {
    const res = await fetch("/api/prices");
    if (!res.ok) return null;
    const data = await res.json();
    return data.prices ?? null;
  } catch {
    return null;
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
 * - Module-level cache ensures only one network request regardless of how many
 *   components use the hook.
 */
export function usePrices(): PriceMap | null {
  const [prices, setPrices] = useState<PriceMap | null>(cachedPrices);

  useEffect(() => {
    // Already cached from a previous render
    if (cachedPrices) {
      setPrices(cachedPrices);
      return;
    }

    // Deduplicate concurrent fetches
    if (!fetchPromise) {
      fetchPromise = fetchPrices();
    }

    let cancelled = false;

    fetchPromise.then((result) => {
      if (result) {
        cachedPrices = result;
      }
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

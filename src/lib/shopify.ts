/**
 * Shopify Storefront API client (server-side only).
 *
 * Fetches product prices via the public Storefront API and returns
 * a map of product handle → formatted EUR + BGN prices.
 */

// EUR ↔ BGN fixed exchange rate (official ERM II peg)
const EUR_TO_BGN_RATE = 1.95583;

const SHOPIFY_API_VERSION = "2025-01";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProductPrice {
  amount: string;
  currencyCode: string;
  formatted: string;
  formattedBGN: string;
}

export type PriceMap = Record<string, ProductPrice>;

interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

interface StorefrontProduct {
  handle: string;
  title: string;
  /** Default variant (first available) — Storefront API 2024-10+ */
  selectedOrFirstAvailableVariant?: {
    price: MoneyV2;
  } | null;
  /** Fallback: first variant in admin order */
  variants: {
    edges: Array<{
      node: {
        price: MoneyV2;
      };
    }>;
  };
}

interface StorefrontResponse {
  data?: {
    products: {
      edges: Array<{ node: StorefrontProduct }>;
    };
  };
  errors?: Array<{ message: string }>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Thousands-separator formatting (e.g. 12345 → "12,345") */
function formatNumber(num: number): string {
  return Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Given an amount + currency code, produce display strings for EUR and BGN.
 * If the store currency is BGN we derive EUR; otherwise we assume EUR and
 * derive BGN.
 */
function formatPrice(
  amount: number,
  currencyCode: string,
): { formatted: string; formattedBGN: string } {
  if (currencyCode === "BGN") {
    const eur = amount / EUR_TO_BGN_RATE;
    return {
      formatted: `€${formatNumber(eur)}`,
      formattedBGN: `${formatNumber(amount)} BGN`,
    };
  }

  // Default: treat as EUR
  const bgn = amount * EUR_TO_BGN_RATE;
  return {
    formatted: `€${formatNumber(amount)}`,
    formattedBGN: `${formatNumber(bgn)} BGN`,
  };
}

// ---------------------------------------------------------------------------
// Main fetch
// ---------------------------------------------------------------------------

export async function fetchShopifyPrices(): Promise<PriceMap> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error("Shopify environment variables are not configured");
  }

  const query = `{
    products(first: 20) {
      edges {
        node {
          handle
          title
          selectedOrFirstAvailableVariant {
            price {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await fetch(
    `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 }, // Cache in Next.js Data Cache for 1 hour
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify API responded with ${response.status}`);
  }

  const json: StorefrontResponse = await response.json();

  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL: ${json.errors[0].message}`);
  }

  if (!json.data) {
    throw new Error("No data returned from Shopify");
  }

  const priceMap: PriceMap = {};

  for (const { node } of json.data.products.edges) {
    // Prefer the default variant (selectedOrFirstAvailableVariant),
    // fall back to the first variant in admin order
    const price =
      node.selectedOrFirstAvailableVariant?.price ??
      node.variants.edges[0]?.node.price;

    if (!price) continue; // skip products with no variants

    const amount = parseFloat(price.amount);
    const currencyCode = price.currencyCode;
    const { formatted, formattedBGN } = formatPrice(amount, currencyCode);

    priceMap[node.handle] = {
      amount: price.amount,
      currencyCode,
      formatted,
      formattedBGN,
    };
  }

  return priceMap;
}

import { NextResponse } from "next/server";

// If you want to prevent Next.js from caching this route during dev,
// uncomment the line below. Useful when testing API responses.
// export const dynamic = "force-dynamic";

// Read the API URL from environment variables (.env.local)
// Make sure you have: COINGECKO_API_URL=https://api.coingecko.com/api/v3/coins/markets
const API_URL = process.env.COINGECKO_API_URL;

// API route handler for GET requests to /api/markets
export async function GET() {
  // Safety check: if the env var is missing, return a 500 error
  if (!API_URL) {
    return NextResponse.json(
      { error: "Missing COINGECKO_API_URL in env" },
      { status: 500 }
    );
  }

  // Build query string for CoinGecko API
  const qs = new URLSearchParams({
    vs_currency: "usd", // Convert prices to USD
    order: "market_cap_desc", // Sort by market cap (highest first)
    per_page: "10", // Limit to 10 results
    page: "1", // First page
    sparkline: "false", // Disable sparkline data
  });

  // Full API endpoint with query parameters
  const url = `${API_URL}?${qs.toString()}`;

  try {
    // Fetch data from CoinGecko
    const upstream = await fetch(url, {
      // cache: "no-store", // Uncomment if you want to disable caching completely
      // headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY ?? '' }, // Use if you have an API key
    });

    // Handle non-200 responses gracefully
    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream error ${upstream.status}` },
        { status: upstream.status }
      );
    }

    // Parse JSON response
    const data = await upstream.json();

    // Return the data as JSON, with caching headers for performance
    return NextResponse.json(data, {
      headers: {
        // Allow caching for 60s, but serve stale data while revalidating up to 5 min
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    // Catch network or runtime errors and return them as a JSON response
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Request failed: ${message}` },
      { status: 500 }
    );
  }
}

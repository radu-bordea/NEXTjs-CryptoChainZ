import { NextResponse } from "next/server";

// Read the API URL from environment variables (.env.local)
// Example: COINGECKO_API_URL=https://api.coingecko.com/api/v3/coins/markets
const API_URL = process.env.COINGECKO_API_URL;

// API route handler for GET requests to /api/markets
export async function GET(request) {
  // Safety check: if the env var is missing, return a 500 error
  if (!API_URL) {
    return NextResponse.json(
      { error: "Missing COINGECKO_API_URL in env" },
      { status: 500 }
    );
  }

  // Extract query parameters from the incoming request URL
  const { searchParams } = new URL(request.url);

  // Get "limit" from query string (?limit=20), default to 10
  const limit = searchParams.get("limit") ?? "10";

  // Build query string for CoinGecko API
  const qs = new URLSearchParams({
    vs_currency: "usd", // Convert prices to USD
    order: "market_cap_desc", // Sort by market cap (highest first)
    per_page: limit, // Use the dynamic limit from query params
    page: "1", // First page (hard-coded for now)
    sparkline: "false", // Disable sparkline data for performance
  });

  // Full CoinGecko endpoint with query parameters
  const url = `${API_URL}?${qs.toString()}`;

  try {
    // Fetch data from CoinGecko
    const upstream = await fetch(url);

    // Handle non-200 responses gracefully
    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream error ${upstream.status}` },
        { status: upstream.status }
      );
    }

    // Parse the JSON response body
    const data = await upstream.json();

    // Return the data as JSON, with caching headers for performance
    return NextResponse.json(data, {
      headers: {
        // Cache for 60s, but serve stale data while revalidating up to 5 min
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    // Catch network or runtime errors and return them as JSON
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Request failed: ${message}` },
      { status: 500 }
    );
  }
}

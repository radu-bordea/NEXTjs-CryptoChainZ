// app/coin-details/[id]/page.jsx

// "headers" gives us access to the incoming request headers
// when Next.js runs on the server (App Router only).
import { headers } from "next/headers";

// ISR (Incremental Static Regeneration): cache this page for 60s, then revalidate
export const revalidate = 60;

async function getCoin(id) {
  // Grab the request headers (from the client → server)
  const h = headers();

  // 1) host: The domain name of the request
  // - Locally → "localhost:3000"
  // - In production → "yourapp.vercel.app" or "yourdomain.com"
  //
  // "x-forwarded-host" is often set by proxies (like Vercel’s edge network)
  // so we prefer that if available, otherwise fall back to plain "host".
  const host = h.get("x-forwarded-host") ?? h.get("host");

  // 2) proto: The protocol (http or https)
  // - Locally (dev server) → usually "http"
  // - In production (Vercel, Netlify, etc.) → "https"
  //
  // Again, "x-forwarded-proto" is added by proxies, so it tells us the
  // *original* protocol the user used.
  const proto = h.get("x-forwarded-proto") ?? "http";

  // 3) Combine them into a base URL
  // e.g. "http://localhost:3000"  (dev)
  //      "https://myapp.vercel.app" (production)
  const base = `${proto}://${host}`;

  // 4) Now we can safely call our *internal* API route with an absolute URL
  // e.g. "http://localhost:3000/api/coins/bitcoin"
  const res = await fetch(`${base}/api/coins/${encodeURIComponent(id)}`, {
    // Revalidate cached data every 60s
    next: { revalidate: 60 },
  });

  // 5) Error handling
  if (!res.ok) throw new Error(`Failed to fetch coin ${id}`);

  // 6) Return parsed JSON from our API route
  return res.json();
}

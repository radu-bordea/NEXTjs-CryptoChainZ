import Image from "next/image";
import Link from "next/link";
import CoinChart from "@/components/CoinChart";

// app/coin-details/[id]/page.jsx
// Revalidate every 60 seconds → ISR (Incremental Static Regeneration).
// Next.js will re-generate the page at most once per minute.
export const revalidate = 60;

// Base URL for CoinGecko API. Falls back to public endpoint if env var not set.
const BASE_URL = process.env.COIN_API_URL ?? "https://api.coingecko.com/api/v3";

// --- Data fetching helper function ---
// Fetch coin details from CoinGecko by its id (like "bitcoin").
// Uses Next.js fetch with `revalidate: 60` so responses are cached for a minute.
async function getCoin(id) {
  const res = await fetch(`${BASE_URL}/coins/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
    // headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY }
    // ^ optional: if you have a CoinGecko Pro API key
  });
  if (!res.ok) throw new Error(`Failed to fetch coin ${id}`);
  return res.json();
}

// --- Page Component ---
// Because this is an async server component, it can directly await data.
export default async function CoinDetailsPage({ params }) {
  const { id } = params; // dynamic segment from the URL → e.g. /coin-details/bitcoin
  const coin = await getCoin(id); // fetch the coin details

  return (
    <div className="container md:w-full flex flex-col mx-auto items-center p-12 mt-24 mb-10 bg-gray-900 text-cyan-100 shadow-2xl rounded-lg shadow-cyan-200">
      {/* Back link to home page */}
      <Link href="/" className="text-amber-400 mb-2">
        home 👈 👈 👈
      </Link>

      {/* Title with coin ID and symbol */}
      <h1 className="text-2xl font-bold">
        {coin
          ? `${coin.id.toUpperCase()} (${coin.symbol.toUpperCase()})`
          : "Coin Details"}
      </h1>

      <div className="space-y-8 text-center">
        {/* Coin logo */}
        <Image
          src={coin.image.large}
          alt={coin.name}
          width={82}
          height={82}
          className="rounded-full mx-auto mt-2"
        />

        {/* Short description (first sentence only) */}
        <p>{coin.description.en.split(". ")[0] + "."}</p>

        {/* Coin stats section */}
        <div className="space-y-2">
          <h3 className="text-2xl">Rank: #{coin.market_cap_rank}</h3>
          <h3 className="text-2xl">
            Current Price: $
            {coin.market_data.current_price.usd.toLocaleString()}
          </h3>
          <h4 className="text-xl">
            Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
          </h4>
          <h4 className="text-xl">
            24h High: ${coin.market_data.high_24h.usd.toLocaleString()}
          </h4>
          <h4 className="text-xl">
            24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}
          </h4>
          <h4 className="text-xl">
            24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)} (
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
          </h4>
          <h4 className="text-xl">
            Circulating Supply:{" "}
            {coin.market_data.circulating_supply.toLocaleString()}
          </h4>
          <h4 className="text-xl">
            Total Supply: {coin.market_data.total_supply?.toLocaleString()}
          </h4>
          <h4 className="text-xl">
            All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{" "}
            {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
          </h4>
          <h4 className="text-xl">
            All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{" "}
            {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
          </h4>
          <h4 className="text-xl">
            Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
          </h4>
        </div>

        {/* Line chart with last 7 days price data */}
        <CoinChart coinId={coin.id} />

        {/* External links (homepage, blockchain explorer, categories) */}
        <div>
          {/* Official Website */}
          {coin.links.homepage[0] && (
            <p>
              <Link
                href={coin.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-500 mb-2"
              >
                Website 👈
              </Link>
            </p>
          )}

          {/* Blockchain Explorer */}
          {coin.links.blockchain_site[0] && (
            <p>
              <Link
                href={coin.links.blockchain_site[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-500 mb-2"
              >
                Blockchain Explorer 👈
              </Link>
            </p>
          )}

          {/* Categories list */}
          {coin.categories.length > 0 && (
            <p className="mt-2">Categories: {coin.categories.join(", ")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

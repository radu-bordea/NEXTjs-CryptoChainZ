"use client"; // Enables React client-side hooks like useState/useEffect

import { useState, useEffect } from "react";
import CoinCard from "@/components/CoinCard";
import LimitSelector from "@/components/LimitSelector";
import FilterInput from "@/components/FilterInput";
import SortSelector from "@/components/SortSelector";

export default function Home() {
  // Local state for data fetching
  const [coins, setCoins] = useState([]); // Stores fetched coins
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error message if fetch fails
  const [limit, setLimit] = useState(10); // Number of coins to display
  const [filter, setFiler] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  // Fetch coins whenever "limit" changes
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // Call our API route with limit as query parameter
        const res = await fetch(`/api/markets?limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        // Parse response JSON
        const data = await res.json();
        console.log("Fetched coins:", data);

        setCoins(data);
      } catch (err) {
        // Save error for rendering
        setError(err.message);
      } finally {
        // End loading regardless of success/failure
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]); // 🔑 re-run whenever user changes "limit"

  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        // cases for market_cap
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;

        // cases for price_desc
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;

        // cases for changes 24h
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });

  return (
    <div className="w-full min-h-screen px-4">
      {/* Title */}
      <h1 className="text-center mt-24 text-gray-400 text-3xl mt-8 mb-4">
        🚀 CryptoChainZ
      </h1>

      {/* Loading state */}
      {loading && (
        <p className="text-3xl text-center text-amber-300">Loading...</p>
      )}

      {/* Error state */}
      {error && (
        <div className="text-3xl text-center text-red-500">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <FilterInput filter={filter} onFilterChange={setFiler} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {/* Render grid of coin cards if data is loaded */}
      {!loading && !error && (
        <main className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p className="text-3xl text-center text-red-400">
              No matching coins
            </p>
          )}
        </main>
      )}
    </div>
  );
}

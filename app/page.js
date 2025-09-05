"use client"; // Enables React client-side hooks like useState/useEffect

import { useState, useEffect } from "react";
import CoinCard from "@/components/CoinCard";
import LimitSelector from "@/components/LimitSelector";
import FilterInput from "@/components/FilterInput";

export default function Home() {
  // Local state for data fetching
  const [coins, setCoins] = useState([]); // Stores fetched coins
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error message if fetch fails
  const [limit, setLimit] = useState(10); // Number of coins to display
  const [filter, setFiler] = useState("");

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

  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div className="w-full min-h-screen px-4">
      {/* Title */}
      <h1 className="text-center text-gray-400 text-3xl mt-8 mb-4">
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

      <div className="flex justify-between">
        <FilterInput filter={filter} onFilterChange={setFiler} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      {/* Render grid of coin cards if data is loaded */}
      {!loading && !error && (
        <main className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {filteredCoins.length > 0 ? (filteredCoins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          ))):(
          <p className="text-3xl text-center text-red-400">
            No matching coins

          </p>)}
        </main>
      )}
    </div>
  );
}

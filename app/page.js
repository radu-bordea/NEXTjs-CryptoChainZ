"use client"; // Enables React client-side hooks like useState/useEffect

import { useState, useEffect } from "react";
import CoinCard from "@/components/CoinCard";
import LimitSelector from "@/components/LimitSelector";

export default function Home() {
  // Local state for data fetching
  const [coins, setCoins] = useState([]); // Stores fetched coins
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error message if fetch fails
  const [limit, setLimit] = useState(10); // Number of coins to display

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

  return (
    <div className="w-full min-h-screen px-4">
      {/* Title */}
      <h1 className="text-center text-gray-400 text-3xl mt-8">
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
      <LimitSelector limit={limit} onLimitChange={setLimit} />

      {/* Render grid of coin cards if data is loaded */}
      {!loading && !error && (
        <main className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {coins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          ))}
        </main>
      )}
    </div>
  );
}

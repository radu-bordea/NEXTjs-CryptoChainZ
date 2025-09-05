"use client";

import { useState, useEffect } from "react";
import CoinCard from "@/components/CoinCard";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch("api/markets");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="cointainer">
      <h1 className="text-center text-gray-400 text-3xl m-8">
        🚀 CryptoChainZ
      </h1>
      {loading && (
        <p className="text-3xl text-center text-amber-300">Loading...</p>
      )}
      {error && (
        <div className="text-3xl text-center text-red-500">{error}</div>
      )}
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

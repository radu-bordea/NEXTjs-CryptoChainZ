"use client";

import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

// Register the Chart.js components you plan to use.
// Without this, the chart won't know about scales/elements.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = process.env.NEXT_PUBLIC_COIN_API_URL;
// Must be defined in .env.local, e.g. NEXT_PUBLIC_COIN_API_URL="https://api.coingecko.com/api/v3/"

export default function CoinChart({ coinId }) {
  // Local state for chart data and error messages
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId) return; // Skip if no coinId passed
    if (!API_URL) {
      setError("Missing NEXT_PUBLIC_COIN_API_URL");
      return;
    }

    // AbortController prevents memory leaks if component unmounts
    const ctrl = new AbortController();

    (async () => {
      try {
        // Build the request URL
        const url = `${API_URL}coins/${encodeURIComponent(
          coinId
        )}/market_chart?vs_currency=usd&days=7`;

        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 120)}…`);
        }

        // Parse JSON response
        const data = await res.json();
        const raw = data?.prices ?? [];
        if (!Array.isArray(raw) || raw.length === 0) {
          throw new Error("No price data returned.");
        }

        // Convert [timestamp, price] arrays into {x, y} points
        const points = raw.map(([ts, price]) => ({ x: ts, y: price }));

        // Store chart-ready dataset
        setChartData({
          datasets: [
            {
              label: "Price (USD)",
              data: points,
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.3, // curve smoothing
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(1, 123, 255, 0.1)",
            },
          ],
        });
        setError(null);
      } catch (e) {
        // Ignore aborted fetches, show any other error
        if (e.name !== "AbortError") setError(e.message);
      }
    })();

    // Cleanup: cancel fetch if component unmounts
    return () => ctrl.abort();
  }, [coinId]);

  // Chart options are defined once and memoized with useMemo.
  // This avoids recreating a new object on every render,
  // which would cause the chart to re-initialize unnecessarily.
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { mode: "index", intersect: false },
      },
      interaction: { mode: "index", intersect: false },
      scales: {
        x: {
          type: "time", // time scale requires chartjs-adapter-date-fns
          time: { unit: "day" },
          ticks: { autoSkip: true, maxTicksLimit: 7 },
        },
        y: {
          ticks: {
            // Format y-axis labels with $ and thousand separators
            callback: (v) =>
              typeof v === "number" ? `$${v.toLocaleString()}` : v,
          },
        },
      },
    }),
    [] // Dependencies: [] means options object is created once
  );

  // Show error or loading state before chart is ready
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!chartData) return <div>Loading chart…</div>;

  // Render chart once data is ready
  return (
    <div style={{ marginTop: 30, height: 320 }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

// --- CoinCard Component ---
// Renders a single coin's summary info inside a clickable card.
// Clicking the card navigates to /coin-details/[id] (dynamic page).
const CoinCard = ({ coin }) => {
  return (
    // Wrap the whole card in a Next.js <Link> so the entire card is clickable.
    <Link href={`/coin-details/${coin.id}`}>
      <div className="p-4 rounded-xl bg-neutral-900 shadow-lg hover:shadow-amber-50 cursor-pointer">
        {/* Header section: coin logo + name + symbol */}
        <div className="flex justify-start mb-2 gap-4">
          <Image
            src={coin.image} // coin logo image (from API)
            alt={coin.name} // accessible alt text
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h2>{coin.name}</h2>
            <p>{coin.symbol.toUpperCase()}</p>
          </div>
        </div>

        {/* Current price */}
        <p>Price: ${coin.current_price.toLocaleString()}</p>

        {/* 24h price change with conditional color: green if up, red if down */}
        <p
          className={
            coin.price_change_percentage_24h >= 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {coin.price_change_percentage_24h.toFixed(2)} %
        </p>

        {/* Market cap */}
        <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default CoinCard;

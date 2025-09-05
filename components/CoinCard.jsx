import Image from "next/image";

const CoinCard = ({ coin }) => {
  return (
    <div
      className="p-4 rounded-xl bg-neutral-900 shadow-lg hover:shadow-amber-50"
    >
      <div className="flex justify-start mb-2 gap-4">
        <Image
          src={coin.image}
          alt={coin.name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h2>{coin.name}</h2>
          <p className="">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <p>Price: ${coin.current_price.toLocaleString()}</p>
      <p
        className={
          coin.price_change_percentage_24h >= 0
            ? "text-green-500"
            : "text-red-500"
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)} %
      </p>
      <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinCard;

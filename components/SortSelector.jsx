const SortSelector = ({ sortBy, onSortChange }) => {
  return (
    <div className="text-right flex text-gray-300 p-2 mx-2">
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        value={sortBy}
        className="cursor-pointer bg-neutral-700 ml-1.5 px-2 py-1 rounded-sm"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="market_cap_desc">Market Cap (High To Low)</option>
        <option value="market_cap_asc">Market Cap (Low To High)</option>
        <option value="price_desc">Price (High To Low)</option>
        <option value="price_asc">Price (Low To High)</option>
        <option value="change_desc">24h Change (High To Low)</option>
        <option value="change_asc">24h Change (Low To High)</option>
      </select>
    </div>
  );
};

export default SortSelector;

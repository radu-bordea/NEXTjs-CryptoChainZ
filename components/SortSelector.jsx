// --- SortSelector Component ---
// Dropdown menu that lets the user choose how to sort the list of coins.
// Props:
//   - sortBy: the current selected sort option (string)
//   - onSortChange: callback to update sort option in parent state
const SortSelector = ({ sortBy, onSortChange }) => {
  return (
    <div className="text-right flex text-gray-300 p-2 mx-2">
      {/* Label for accessibility, linked to select by id */}
      <label htmlFor="sort">Sort By:</label>

      {/* Dropdown controlled by parent state */}
      <select
        id="sort"
        value={sortBy} // controlled value from parent
        className="cursor-pointer bg-neutral-700 ml-1.5 px-2 py-1 rounded-sm"
        // Pass new sort option string to parent when user selects
        onChange={(e) => onSortChange(e.target.value)}
      >
        {/* Sorting options that match API query params */}
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

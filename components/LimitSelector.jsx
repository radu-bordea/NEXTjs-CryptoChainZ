// --- LimitSelector Component ---
// A dropdown menu that lets the user select how many results (coins) to show.
// Props:
//   - limit: the current selected limit (number)
//   - onLimitChange: callback to update the limit in parent state
const LimitSelector = ({ limit, onLimitChange }) => {
  return (
    <div className="text-right flex text-gray-300 p-2">
      {/* Label for accessibility, connected via htmlFor + id */}
      <label htmlFor="limit">Show: </label>

      {/* Dropdown (select element) bound to `limit` state */}
      <select
        id="limit"
        className="cursor-pointer bg-neutral-700 ml-1.5 px-2 py-1 rounded-sm"
        value={limit} // controlled value from parent state
        // Convert string → number and send to parent when changed
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        {/* Options for different page sizes */}
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default LimitSelector;

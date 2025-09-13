// --- FilterInput Component ---
// A controlled input field used to filter coins by name or symbol.
// Props:
//   - filter: the current filter string (state managed by parent)
//   - onFilterChange: callback function to update filter in parent
const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="flex-1 text-start border-1 mx-4 rounded-md border-neutral-700">
      <input
        type="text"
        value={filter} // controlled input value
        className="rounded-lg w-full p-2"
        placeholder="Filter coins by name or symbol"
        // Call parent-provided handler whenever the text changes
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;

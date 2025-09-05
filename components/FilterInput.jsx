const FilterInput = ({filter, onFilterChange}) => {
    return (
      <div className="flex-1 text-start border-1 mx-4 rounded-md border-neutral-700">
        <input
          type="text"
          value={filter}
          className="rounded-lg w-full p-2"
          placeholder="Filter coins by name or symbol"
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
    );
}
 
export default FilterInput;
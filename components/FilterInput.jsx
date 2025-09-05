const FilterInput = ({filter, onFilterChange}) => {
    return (
      <div className="w-full px-4 text-start">
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
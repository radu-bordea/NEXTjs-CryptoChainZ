const LimitSelector = ({ limit, onLimitChange }) => {
  return (
      <div className="text-right flex text-gray-300 p-2">
        {/* Dropdown to control number of results */}
      <label htmlFor="limit">Show:  </label>
      <select
        id="limit"
        className="cursor-pointer bg-neutral-700 ml-1.5 px-2 py-1 rounded-md"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))} // update state
      >
        {/* Options: different result limits */}
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

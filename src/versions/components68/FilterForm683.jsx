const FilterForm683 = ({
  hideCompleted,
  setHideCompleted,
  filterStr,
  setFilterStr,
}) => {
  return (
    <>
      <div className="filter-form">
        <div className="filter-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={filterStr}
            onChange={(e) => setFilterStr(e.target.value)}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={() => {
              setHideCompleted(!hideCompleted);
            }}
          />
          Hide Completed
        </label>
      </div>
    </>
  );
};

export default FilterForm683;

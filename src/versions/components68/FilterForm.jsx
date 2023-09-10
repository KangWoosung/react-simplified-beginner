import React from "react";

const FilterForm = ({ filterStr, onChangeFilterStr, hideCompleted }) => {
  return (
    <>
      <div className="filter-form">
        <div className="filter-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={filterStr}
            onChange={onChangeFilterStr}
          />
        </div>
        <label>
          <input type="checkbox" onChange={hideCompleted} />
          Hide Completed
        </label>
      </div>
    </>
  );
};

export default FilterForm;

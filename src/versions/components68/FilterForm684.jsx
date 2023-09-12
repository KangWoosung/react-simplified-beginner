import React from "react";
import { useState, useEffect, useContext } from "react";
import { TodosContext } from "../Components684";

const FilterForm684 = ({
  filterRef,
  filterStr,
  setFilterStr,
  hideCompleted,
  setHideCompleted,
}) => {
  return (
    <>
      <form onSubmit={(e) => handleFilter(e)} id="filter-todos-form">
        <label htmlFor="filter-todos">Filter Todos</label>
        <input
          type="text"
          id="filter-todos"
          ref={filterRef}
          value={filterStr}
          onChange={(e) => setFilterStr(e.target.value)}
        />
        <label htmlFor="hide-completed">Hide Completed</label>
        <input
          type="checkbox"
          id="hide-completed"
          checked={hideCompleted}
          onChange={(e) => setHideCompleted(!hideCompleted)}
        />
      </form>
    </>
  );
};

export default FilterForm684;

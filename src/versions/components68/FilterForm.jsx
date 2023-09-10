import React from "react";
import { useContext } from "react";
import { TodosContext } from "../Components682";
import { ACTION } from "../Components682";

const FilterForm = () => {
  const { state, dispatch, setStorageTodos } = useContext(TodosContext);
  const { todos, filterStr, hideCompleted } = state;

  return (
    <>
      <div className="filter-form">
        <div className="filter-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={filterStr}
            onChange={(e) => {
              dispatch({
                type: ACTION.FILTER_TODOLIST,
                payload: e.target.value,
              });
            }}
          />
        </div>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              dispatch({ type: ACTION.HIDE_COMPLETED });
            }}
          />
          Hide Completed
        </label>
      </div>
    </>
  );
};

export default FilterForm;

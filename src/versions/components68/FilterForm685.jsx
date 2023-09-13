import React from "react";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { TodosContext } from "../Components684";

/* 2023-09-13 04:09:10
여기서의 form 은 네버 서밋 되는 폼이다. 
react-hook-form 은, submit 이벤트에 유용한 라이브러리이지, 폼 인풋 필드의 상태변화를 감시만 해야하는 상황에는 유용하지가 않다. 

react-hook-form 도입 실패...
*/

const FilterForm684 = ({
  filterStr,
  setFilterStr,
  hideCompleted,
  setHideCompleted,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const handleFilter = (data) => {
    setFilterStr(data.filterStr);
    setHideCompleted(data.hideCompleted);
    console.log("data.hideCompleted : ", data.hideCompleted);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleFilter)} id="filter-todos-form">
        <label htmlFor="filter-todos">Filter Todos</label>
        <input
          type="text"
          {...register("filterStr")}
          defaultValue={filterStr}
        />
        <label htmlFor="hide-completed">Hide Completed</label>
        <input
          type="checkbox"
          id="hide-completed"
          {...register("hideCompleted")}
          defaultChecked={hideCompleted}
        />
      </form>
    </>
  );
};

export default FilterForm684;

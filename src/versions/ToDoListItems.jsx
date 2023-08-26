import React from "react";

//  ToDoListItem component
//  Props: children = name, isComplete = boolean
//  Checkbox (checked if complete)
//  Label (children value)

const ToDoListItems = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.children}</label>
      <input type="checkbox" defaultChecked={props.isComplete} id={props.id} />
    </div>
  );
};

export default ToDoListItems;

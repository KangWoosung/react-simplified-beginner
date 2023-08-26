import React from "react";
import ToDoListItems from "./ToDoListItems";

//  ToDoListItem component
//  Props: children = name, isComplete = boolean
//  Checkbox (checked if complete)
//  Label (children value)

const todoData = [
  { id: 1, name: "순두부찌개", isComplete: true },
  { id: 2, name: "감자볶음", isComplete: false },
  { id: 3, name: "빨래개기", isComplete: false },
  { id: 4, name: "마파두부", isComplete: false },
];

const Components12 = () => {
  return (
    <div>
      <h3>Components12: ToDoList</h3>
      {todoData.map((item) => {
        return (
          <ToDoListItems
            key={item.id}
            id={item.id}
            isComplete={item.isComplete}
          >
            {item.name}
          </ToDoListItems>
        );
      })}
    </div>
  );
};

export default Components12;

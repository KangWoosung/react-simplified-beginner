import React from "react";

const Child41 = (props) => {
  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          type="checkbox"
          checked={props.finished}
          data-list-item-checkbox
          onChange={(e) => props.toggleFunc(props.id, e.target.checked)}
        />
        <span data-list-item-text>{props.todo}</span>
      </label>
      <button data-button-delete onClick={() => props.removeFunc(props.id)}>
        Delete Me
      </button>
    </li>
  );
};

export default Child41;

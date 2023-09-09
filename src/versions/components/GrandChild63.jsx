import React from "react";
import { useContext } from "react";
import { UserContext } from "../Components63";

const GrandChild63 = () => {
  const { isDarkMode, toggleTheme } = React.useContext(UserContext);
  return (
    <button
      style={{
        backgroundColor: isDarkMode ? "#FFF" : "#333",
        color: isDarkMode ? "#333" : "#FFF",
        border: "none",
        padding: "1rem 2rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
      }}
      onClick={toggleTheme}
    >
      Change Theme
    </button>
  );
};

export default GrandChild63;

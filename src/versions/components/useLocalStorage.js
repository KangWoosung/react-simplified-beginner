import { useState, useEffect, useCallback } from "react";

const useLocalStorage = () => {
  const [localStrg, setLocalStrg] = useState("");
  return { localStrg, setLocalStrg };
};

export default useLocalStorage;

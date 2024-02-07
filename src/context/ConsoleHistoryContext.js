import React, { useState } from "react";
import { NEXT_COMMAND } from "../constants/enums";

const ConsoleHistoryContext = React.createContext();

export const useConsoleHistory = () => {
  return React.useContext(ConsoleHistoryContext);
};

export const ConsoleHistoryContextProvider = ({ children }) => {
  //state declaration
  const [commandHistory, setCommandHistory] = useState([]);
  const [currCommandIndex, setCurrentCommandIndex] = useState(0);

  const addCommand = (command) => {
    const newCommandHistory = [...commandHistory, command];
    setCommandHistory(newCommandHistory);
    setCurrentCommandIndex(newCommandHistory.length);
  };

  const getCommand = (direction) => {
    if (direction === NEXT_COMMAND) {
      const nextIdx = currCommandIndex + 1;
      if (nextIdx >= commandHistory.length) {
        return "";
      }
      setCurrentCommandIndex(nextIdx);
      return commandHistory[nextIdx];
    }

    const prevIdx = currCommandIndex - 1;
    if (prevIdx < 0) {
      return "";
    }
    setCurrentCommandIndex(prevIdx);
    return commandHistory[prevIdx];
  };

  return (
    <ConsoleHistoryContext.Provider value={{ commandHistory, addCommand, getCommand }}>
      {children}
    </ConsoleHistoryContext.Provider>
  );
};

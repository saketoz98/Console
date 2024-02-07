import React, { useState } from "react";
import { OUTPUT_FAILED, OUTPUT_LOADING, OUTPUT_SUCCESS } from "../constants/enums";
import { executeCode } from "../helpers/api";
import { useConsoleHistory } from "./ConsoleHistoryContext";
import { isObjectType, processExecutionResult } from "../helpers/utils";

const ConsoleContext = React.createContext();

export const useConsole = () => {
  return React.useContext(ConsoleContext);
};

export const ConsoleContextProvider = ({ children }) => {
  //state declaration
  const [consoleElements, setConsoleElements] = useState([
    {
      id: 1,
      input: {
        code: "",
        error: false,
      },
      output: null,
    },
  ]);
  const [error, setError] = useState(null);
  const { addCommand } = useConsoleHistory();

  //function declaration
  const updateInputCode = (inputId, code) => {
    const currInputIdx = consoleElements.findIndex((element) => element.id === inputId);
    const newConsoleElementsState = [...consoleElements];
    if (currInputIdx !== -1) {
      const element = newConsoleElementsState[currInputIdx];
      element.input.code = code;
      setConsoleElements(newConsoleElementsState);
    }
  };

  const handleCodeExecution = async (inputId, code) => {
    setError(null);
    updateConsoleOutputState(inputId, OUTPUT_LOADING, null, null);
    updateInputCode(inputId, code);

    try {
      const response = await executeCode(code);
      const data = response.data;
      console.log("Response Fetched ", data);
      const parsedOutput = processExecutionResult(data);
      if (isObjectType(parsedOutput.data) && parsedOutput.data.hasOwnProperty("type") && parsedOutput.data.type === "error") {
        updateConsoleOutputState(inputId, OUTPUT_FAILED, null, parsedOutput.data);
      } else {
        addCommand(code);
        updateConsoleOutputState(inputId, OUTPUT_SUCCESS, data, null);
        if (inputId === consoleElements.length) {
          insertNewInput(inputId + 1);
        }
      }
    } catch (error) {
      console.log("Error Occurred", error);
      setError(error.message);
      updateConsoleOutputState(inputId, OUTPUT_FAILED, null, error.message);
    }
  };

  const insertNewInput = (inputId) => {
    setConsoleElements([...consoleElements, { id: inputId, input: { code: "", error: false }, output: null }]);
  };

  const updateConsoleOutputState = (inputId, status, output, errors) => {
    const currOutputIdx = consoleElements.findIndex((element) => element.id === inputId);
    const newConsoleElementsState = [...consoleElements];
    newConsoleElementsState[currOutputIdx].output = { id: inputId, status: status, output: output, errors: errors };
    setConsoleElements(newConsoleElementsState);
  };

  return (
    <ConsoleContext.Provider value={{ consoleElements, handleCodeExecution, updateInputCode }}>
      {children}
    </ConsoleContext.Provider>
  );
};

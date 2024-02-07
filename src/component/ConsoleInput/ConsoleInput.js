import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { NEXT_COMMAND, PREV_COMMAND } from "../../constants/enums";
import { useConsole } from "../../context/ConsoleContext";
import { useConsoleHistory } from "../../context/ConsoleHistoryContext";
import { HorizontalRule, ViewHeadline } from "@mui/icons-material";


const ConsoleInput = ({ inputId, toggleMultilineInput, isMultilineInput }) => {
  const [inputValue, setInputValue] = useState("");
  const { handleCodeExecution } = useConsole();
  const { getCommand } = useConsoleHistory();

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter" && e.shiftKey) {
      return;
    } else if (key === "Enter") {
      handleCodeExecution(inputId, inputValue);
    }
    let command = null;
    if (key === "ArrowUp" || key === "ArrowDown") {
      const action = key === "ArrowUp" ? NEXT_COMMAND : PREV_COMMAND;
      command = getCommand(action);
      if (command !== null) {
        setInputValue(command);
      } else {
        setInputValue("");
      }
    }
  };
  return (
    <>
      <TextField
        multiline={isMultilineInput}
        minRows={3} // Customize based on your needs
        maxRows={5} // Customize based on your needs
        fullWidth
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          "& .MuiInputBase-input": {
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            fontSize: "14px", 
            lineHeight: "1.5",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleMultilineInput} edge="end">
                {isMultilineInput ? <HorizontalRule /> : <ViewHeadline />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default ConsoleInput;

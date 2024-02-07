import React from "react";
import { Typography } from "@mui/material";
import { OUTPUT_FAILED, OUTPUT_LOADING } from "../../constants/enums";
import SkimmerConsoleOutput from "../SkimmerConsoleOutput/SkimmerConsoleOutput";
import { getShortHandResult } from "../../helpers/utils";
import { useTheme } from "@emotion/react";

const ConsoleOutput = ({ status, result, errors }) => {
  const theme = useTheme()
  let outputComponent = null;
  if (status === OUTPUT_LOADING) {
    outputComponent = <SkimmerConsoleOutput />;
  } else if (status === OUTPUT_FAILED) {
    const backgroundColor = theme.palette.mode === 'dark' ? '#282c34' : '#f0f0f0';
    outputComponent = (
      <div
        style={{
          backgroundColor: backgroundColor, // Use the error color from the theme
          color: '#e06c75', // Use the text color that contrasts with error color
          fontFamily: 'monospace', // Use monospace font from the theme
          padding: theme.spacing(1), // Use spacing from the theme
          borderRadius: theme.shape.borderRadius, // Use border radius from the theme
          whiteSpace: "pre-wrap",
          overflowX: "auto",
        }}
      >
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          {errors.message}
        </Typography>
      </div>
    );
  } else {
    const opt = getShortHandResult(result)
    const resultText = opt ? opt : opt === null ? "null" : "undefined"
    outputComponent = <Typography>{resultText}</Typography>;
  }
  return (
    <div
      style={{
        width: "100%",
        padding: "2.7px 0",
      }}
    >
      {outputComponent}
    </div>
  );
};

export default ConsoleOutput;

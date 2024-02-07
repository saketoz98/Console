import React from "react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const ConsoleError = ({ error }) => {
  const theme = useTheme();

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          color: theme.palette.error.main,
          fontFamily: "monospace",
          padding: theme.spacing(1),
          borderRadius: theme.shape.borderRadius,
          whiteSpace: "pre-wrap",
          overflowX: "auto",
        }}
      >
        <Typography variant="body2">{error.stack}</Typography>

      </div>      
    </div>
  );
};

export default ConsoleError;

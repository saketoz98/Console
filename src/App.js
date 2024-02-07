import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./component/NotFound/NotFound";
import { useState, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Console from "./component/ConsoleWrapper/ConsoleWrapper";
import { ConsoleContextProvider } from "./context/ConsoleContext";
import { ConsoleHistoryContextProvider } from "./context/ConsoleHistoryContext";
import { grey, blueGrey, teal } from "@mui/material/colors";

function App() {
  const [mode, setMode] = useState("dark");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: teal,
            divider: teal[200],
            background: {
              default: "#fff",
              paper: "#fff",
            },
            text: {
              primary: "#424242",
              secondary: "#212121",
            },
          }
        : {
            // palette values for dark mode
            primary: blueGrey,
            divider: grey[900],
            background: {
              default: "#000",
              paper: "#0e161a",
            },
            text: {
              primary: "#fff",
              secondary: grey[900],
            },
          }),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <div style={{height:"100vh"}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConsoleHistoryContextProvider>
          <ConsoleContextProvider>
              <Routes>
                <Route path="/" element={<Console toggleDarkMode={toggleColorMode} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </ConsoleContextProvider>
        </ConsoleHistoryContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

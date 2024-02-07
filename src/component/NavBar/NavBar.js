import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import ToggleThemeSwitch from "../ToggleThemeSwitch/ToggleThemeSwitch";

const NavBar = ({toggleDarkMode}) => {
  return (
    <AppBar
      position="sticky"
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Console
        </Typography>
        <div>
          <ToggleThemeSwitch onClick={toggleDarkMode}/>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

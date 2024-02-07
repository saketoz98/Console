import React from 'react'
import { Container, Paper } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import Console from "../Console/Console";


const ConsoleWrapper = ({toggleDarkMode}) => {
    return (
        <Container
          sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
          maxWidth="lg"
        >
          <Paper sx={{
              height: '80%',
              overflow: 'auto',
              position: 'relative', 
            }} square={false} elevation={24}>
            <NavBar toggleDarkMode={toggleDarkMode}/>
            <Console />
          </Paper>
        </Container>
      );
}

export default ConsoleWrapper

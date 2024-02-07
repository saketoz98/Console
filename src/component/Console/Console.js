import { Grid } from '@mui/material';
import React from 'react';
import { useConsole } from "../../context/ConsoleContext";
import ConsoleElementWrapper from '../ConsoleElementWrapper/ConsoleElementWrapper';

const Console = () => {
  const { consoleElements} = useConsole();

  return (
    <div>
      <Grid container spacing={0.2}>
        <Grid item xs={12}>
            {consoleElements.map((element) => {
              return <ConsoleElementWrapper key={element.id} element={element} />
            })}
        </Grid>
      </Grid>
    </div>
  )
}

export default Console

import React from "react";
import { Grid, TextField, Checkbox, Button } from "@mui/material";
import { Remove } from "@mui/icons-material";

const AntwortMoeglichkeitGrid = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      {/* First column - TextField */}
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="Antwort"
          variant="outlined"
          // Add TextField props as needed
        />
      </Grid>

      {/* Second column - Checkbox */}
      <Grid item xs={4}>
        <Checkbox
          color="primary"
          // Add Checkbox props as needed
        />
        korrekt
      </Grid>

      {/* Third column - Button with minus icon */}
      <Grid item xs={4}>
        <Button
          variant="outlined"
          startIcon={<Remove />}
          // Add Button props as needed
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};

export default AntwortMoeglichkeitGrid;

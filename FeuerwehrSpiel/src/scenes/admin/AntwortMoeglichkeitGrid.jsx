import React from "react";
import {
  Grid,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";

const AntwortMoeglichkeitGrid = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={1} direction="column">
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item key={index}>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography variant="body1">{`Laderaum ${
                  index + 1
                }`}</Typography>
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AntwortMoeglichkeitGrid;

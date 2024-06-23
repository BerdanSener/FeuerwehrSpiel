import React, { useState } from "react";
import {
  Grid,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Button,
} from "@mui/material";

const AntwortMoeglichkeitGrid = ({ onSelectedAnswersChange }) => {
  const [checkedState, setCheckedState] = useState(new Array(6).fill(false));

  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const selectedAnswers = updatedCheckedState
      .map((checked, i) => (checked ? i + 1 : null))
      .filter(Boolean);
    onSelectedAnswersChange(selectedAnswers);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} direction="column">
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedState[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              }
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

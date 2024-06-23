import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const StatusBar = ({ isSaved, visibility, errorMessage }) => {
  return visibility ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        maxWidth: "300px", // Adjust as needed
        margin: "20px auto", // Centered box, adjust margins as needed
        backgroundColor: isSaved ? "#4CAF50" : "#FF5722", // Green for true, Red for false
      }}
    >
      <Typography variant="body1" sx={{ flexGrow: 1, color: "#fff" }}>
        {isSaved ? "Erflogreich hinzugefügt!" : "Fehler: " + errorMessage}
      </Typography>
      {isSaved ? (
        <CheckIcon sx={{ color: "#fff" }} />
      ) : (
        <ClearIcon sx={{ color: "#fff" }} />
      )}
    </Box>
  ) : (
    <></>
  );
};

export default StatusBar;

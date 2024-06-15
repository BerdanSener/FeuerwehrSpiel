import { Box, TextField } from "@mui/material";
import Header from "../../components/Header/Header";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.mjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import AntwortMoeglichkeitGrid from "./AntwortMoeglichkeitGrid";

const AdminPage = () => {
  const [user] = useAuthState(auth);
  //const userDocRef = doc(db, "Fragenkatalog", user.uid);

  const handleQuestionSave = async (i) => {
    if (user) {
      alert(frage);
    }
  };

  // Generate dummy data for the second grid
  const secondGridItems = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    content: `Item ${index + 1}`,
  }));

  const [frage, setFrage] = useState("");

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Frage hinzufügen" subtitle="Erstelle deine Frage" />

        <Grid container spacing={2}>
          {/* First row with a single column */}
          <Grid item xs={12}>
            <Typography variant="h5">First Row</Typography>
            <TextField
              name="frage"
              label="Frage"
              variant="outlined"
              onChange={setFrage}
            />
          </Grid>

          {/* Second row with nested Grid for dynamic number of rows and 3 columns */}
          <Grid item xs={12}>
            <Typography variant="h5">Second Row</Typography>
            <Grid container spacing={2}>
              {secondGridItems.map((item) => (
                <Grid item xs={4}>
                  {/* Content for each item in the second grid */}
                  <AntwortMoeglichkeitGrid />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Additional rows can be added similarly */}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminPage;

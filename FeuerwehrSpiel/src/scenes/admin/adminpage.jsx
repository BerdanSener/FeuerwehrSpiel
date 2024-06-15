import { Box, TextField } from "@mui/material";
import Header from "../../components/Header/Header";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.mjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { Container, Grid, Paper } from "@mui/material";

const AdminPage = () => {
  const [user] = useAuthState(auth);
  //const userDocRef = doc(db, "Fragenkatalog", user.uid);

  const handleQuestionSave = async (i) => {
    if (user) {
      alert(frage);
    }
  };

  const [frage, setFrage] = useState("");

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Frage hinzufügen" subtitle="Erstelle deine Frage" />

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: 16 }}>
                <TextField
                  name="frage"
                  label="Frage"
                  variant="outlined"
                  onChange={setFrage}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: 16 }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Paper elevation={1} style={{ padding: 16 }}>
                      Nested Grid Item
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: 16 }}>
                Row 3
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPage;

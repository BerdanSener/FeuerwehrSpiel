import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header/Header";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
  collection,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.mjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AntwortMoeglichkeitGrid from "./AntwortMoeglichkeitGrid";
import StatusBar from "./StatusBar";

const AdminPage = () => {
  const [user] = useAuthState(auth);

  const handleQuestionSave = async (i) => {
    if (user) {
      const antworten = {
        Antwort: [0, 5],
      };

      try {
        await setDoc(doc(db, value, frage), {
          ...antworten,
        });

        setSaveStatus(true);
        setStatusBarVisibility(true);
      } catch (error) {
        if (error.code == "invalid-argument") {
          setErrorMsg("Bitte fülle alle Felder aus");
        }
        setSaveStatus(false);
        setStatusBarVisibility(true);
      }
    }
  };

  const [frage, setFrage] = useState("");

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const options = [
    { value: "KLF", label: "KLF" },
    { value: "RLF", label: "RLF" },
    { value: "VF", label: "VF" },
  ];

  const [saveStatus, setSaveStatus] = useState(false);
  const [statusBarVisibility, setStatusBarVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Frage hinzufügen" subtitle="Erstelle deine Frage" />
      </Box>
      <StatusBar
        isSaved={saveStatus}
        visibility={statusBarVisibility}
        errorMessage={errorMsg}
      ></StatusBar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Fahrzeug wählen
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={value}
              onChange={handleChange}
              label="Optionen"
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* First row with a single column */}
        <Grid item xs={12}>
          <Typography variant="h5">Geräte Namen eingeben</Typography>
          <TextField
            name="frage"
            label="Gerät"
            variant="outlined"
            onChange={(e) => setFrage(e.target.value)}
          />
        </Grid>

        {/* Second row with nested Grid for dynamic number of rows and 3 columns */}
        <Grid item xs={12}>
          <Typography variant="h5">Laderäumen zuteilen</Typography>
          <AntwortMoeglichkeitGrid />
        </Grid>

        {/* Additional rows can be added similarly */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleQuestionSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPage;

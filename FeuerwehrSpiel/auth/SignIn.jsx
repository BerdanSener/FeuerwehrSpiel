
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth } from "../../firebase/firebase.mjs";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); 

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in!");
    } catch (error) {
      console.error("Error signing in:", error.message);
      window.alert("Invalid username or password");
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Extract the username from the email
      const googleUsername = user.email.split("@")[0];

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      // Check if a document for the user exists
      if (!userDoc.exists()) {
        // Create a new document if it does not exist
        await setDoc(userDocRef, {
          username: googleUsername,
          balance: 0,
        });
      }

      // Redirect or additional actions after signing in
      console.log("Google sign in successful!");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      //alert(error.message);
    }
  };


  return (
     <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" align="center">
      
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountBalanceIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Addresse"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passwort"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Anmelden
            </Button>
            
              <Button
                variant="contained"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={signInWithGoogle}
                sx={{ mt: 0.5, mb: 2 }}
              >
                Stattdessen mit Google anmelden?
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={(e) =>{
                  e.preventDefault();
                  navigate("/signup");
                }}
                sx={{ mt: 0.5, mb: 2 }}
              >
                Du hast noch kein Konto? Registriere dich!
              </Button>
              
          </Box>
        </Box>
        
      Copyright © FinanzHawara 2024
      </Container>
     </ThemeProvider>
  );
}

export default SignIn;

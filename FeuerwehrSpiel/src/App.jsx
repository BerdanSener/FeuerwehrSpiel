import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.mjs";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Dashboard from "./scenes/dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./scenes/global/sidebar.jsx";
import Topbar from "./scenes/global/topbar.jsx";

function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="App"
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          {user ? (
            // Render this part when user is logged in
            <>
              <div
                style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}
              >
                <Sidebar />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <Topbar />
                  <main className="content" style={{ flexGrow: 1 }}>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/fragen" element={<Dashboard />} />
                      <Route
                        path="/fragen_hinzufuegen"
                        element={<Dashboard />}
                      />
                      <Route
                        path="*"
                        element={<Navigate replace to="/dashboard" />}
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            </>
          ) : (
            // Render this part when no user is logged in
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<Navigate replace to="/signin" />} />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

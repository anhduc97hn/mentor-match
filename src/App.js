import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from "./theme";
import { AuthProvider } from "./contexts/AuthContext";
import { DatePicker } from "./contexts/DatePicker";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <ThemeProvider>
          <DatePicker>
            <Router />
          </DatePicker>
        </ThemeProvider>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;

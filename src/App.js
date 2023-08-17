import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from "./theme";
import { AuthProvider } from "./contexts/AuthContext";
import { DatePicker } from "./contexts/DatePicker";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <DatePicker>
            <Router />
          </DatePicker>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

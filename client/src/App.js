import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Navigation from "./pages/Navigation";
import LandingPage from "./pages/Landing";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navigation />
      <BrowserRouter>
        <Route path="/" exact component={LandingPage} />
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

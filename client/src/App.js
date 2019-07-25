import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import ProfilePage from "./pages/Profile";
import DiscoverPage from "./pages/Discover";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={LandingPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/discover" component={DiscoverPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

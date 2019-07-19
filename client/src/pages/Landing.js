import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

import SignupPage from "./SignUp";
import LoginPage from "./Login";

const landinPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing(0)
  }
});

class LandingPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        <React.Fragment>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <SignupPage />;
              }}
            />
            <Route
              path="/signup"
              render={() => {
                return <SignupPage />;
              }}
            />
            <Route
              path="/login"
              render={() => {
                return <LoginPage />;
              }}
            />
          </Switch>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(landinPageStyle)(LandingPage);

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    background: "linear-gradient(to bottom, #AB3CFD, #AB3CFD)",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    margin: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(to bottom, #35DE86, #35DE86)"
  },
  icon: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(5),
    fontSize: 100,
    color: grey[50]
  },
  whiteText: {
    color: grey[50]
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const signup = () => {
    email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ? setEmailError("")
      : setEmailError("Valid email is required!");
    password === confirmPassword
      ? setConfirmPasswordError("")
      : setConfirmPasswordError("password doesn't match!");

    //TO-DO
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={5} md={5} className={classes.image}>
        <Icon className={classes.icon}>settings</Icon>
        <Typography
          className={classes.whiteText}
          variant="h4"
          color="textPrimary"
        >
          Welcome Back!
        </Typography>
        <Box width="45%">
          <Typography variant="body" className={classes.whiteText}>
            Already have an account? Please login to keep connections
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login
        </Button>
      </Grid>
      <Grid item xs={12} sm={7} md={7} component={Paper} elevation={6}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={e => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
              error={emailError === "" ? false : true}
              helperText={emailError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              error={passwordError === "" ? false : true}
              helperText={passwordError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              onChange={e => setConfirmPassword(e.target.value)}
              error={confirmPasswordError === "" ? false : true}
              helperText={confirmPasswordError}
            />
            <FormControlLabel
              className={classes.form}
              control={<Checkbox value="remember" color="primary" />}
              label={
                <Typography variant="body2" color="textSecondary">
                  {"By signing up I agree with "}
                  <Link color="primary" href="#">
                    terms and conditions
                  </Link>
                </Typography>
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signup}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

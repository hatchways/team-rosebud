import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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

function Login(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = e => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      let status;
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => {
          status = res.status;
          //TODO
          return res.json();
        })
        .then(res => {
          if (status === 200) props.history.push("/profile");
          else setMessage(res.message);
        });
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={5} md={5} className={classes.image}>
        <Icon className={classes.icon}>settings</Icon>
        <Typography variant="h4" className={classes.whiteText}>
          Welcome!
        </Typography>
        <Box width="35%">
          <Typography variant="body2" className={classes.whiteText}>
            Please enter your details to signup and be part of our community
          </Typography>
        </Box>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create an Account
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12} sm={7} md={7} component={Paper} elevation={6}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form}>
            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
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
            />
            <Link href="#" variant="body2">
              {"Forgot Password?"}
            </Link>
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              Login
            </Button>
            {message}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default withRouter(Login);

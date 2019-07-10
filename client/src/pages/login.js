import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
	background: 'linear-gradient(to bottom, #A83AFD, #8225FB)',
    backgroundPosition: 'center',
	display: 'flex',
    flexDirection: 'column',
	alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  form: {
	width: '100%',
	marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    marginTop: theme.spacing(20),
	marginBottom: theme.spacing(5),
	fontSize : 100,
  },
}));

export default function Login() {
  const classes = useStyles();
  
  const login = () => {
	  //TO-DO
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={5} md={5} className={classes.image}>
		<Icon className={classes.icon}>settings</Icon>
		<Typography variant="h4" color="textPrimary">
			Welcome!
		</Typography>
		<Box width="35%">
		<Typography variant="body2">
			Please enter your details to signup and be part of our community
		</Typography></Box>
		<Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create an Account
            </Button>
	  </Grid>
      <Grid item xs={12} sm={7} md={7} component={Paper} elevation={6}>
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form}>
		  
            <TextField
              variant="outlined"
              margin="normal"
              required
			  fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            /><br />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
			  name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Link href="#" variant="body2">
                  {"Forgot Password?"}
                </Link><br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
			  onClick={login}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
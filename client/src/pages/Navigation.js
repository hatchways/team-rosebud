import React from "react";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import image from '../TEST-images/apple-touch-icon.png';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    // backgroundColor: "#fd2d47",
    minHeight: '100px'
  },
  item: {
    margin: '1em'
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function Navigation() {
  const classes = useStyles()

  return(
    <Grid container className={classes.root} alignItems="center" justify="space-between">
      <Grid item className={classes.item}>
        <Grid container alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar} src={image} alt="User Profile Picture" />
          </Grid>
          <Grid item>
            <Typography>
              Developer's Hub
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.item}>
        <div>
          <Button>
            Developers
          </Button>
          <Button>
            Companies
          </Button>
          <Button>
            About
          </Button>
        </div>
      </Grid>
      <Grid item className={classes.item}>
        <div>
          <Button variant="outlined" className={classes.button}>
            Sign Up
          </Button>
          <Button variant="contained" color="primary" className={classes.button}>
            Login
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default Navigation;

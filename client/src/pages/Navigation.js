import React from "react";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import { grey } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import { maxHeight } from "@material-ui/system";

//import image from "../TEST-images/apple-touch-icon.png";

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(to bottom, #424242, #424242)"
    //minHeight: "70px"
  },
  item: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  button: {
    marginRight: theme.spacing(2),
    color: grey[50],
    textTransform: "none",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    borderColor: grey[50],
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  loginButton: {
    marginRight: theme.spacing(5),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    background: "linear-gradient(to bottom, #35DE86, #35DE86)",
    textTransform: "none"
  },
  avatar: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(4),
    background: "linear-gradient(to bottom, #AB3CFD, #AB3CFD)"
  },
  whiteText: {
    color: grey[50]
  }
}));

function Navigation() {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      alignItems="center"
      justify="space-between"
    >
      <Grid item className={classes.item}>
        <Grid container alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar}>
              <Icon>settings</Icon>
            </Avatar>
          </Grid>
          <Grid item>
            <Typography className={classes.whiteText}>
              Developer's Hub
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.item}>
        <div>
          <Button className={classes.button}>Developers</Button>
          <Button className={classes.button}>Companies</Button>
          <Button className={classes.button}>About</Button>
        </div>
      </Grid>
      <Grid item className={classes.item}>
        <div>
          <Button variant="outlined" className={classes.button}>
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
          >
            Login
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default Navigation;

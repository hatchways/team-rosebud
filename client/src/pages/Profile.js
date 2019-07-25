import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { grey } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import EditModal from "./EditModal";
import Navigation from "./Navigation";

import { makeStyles } from "@material-ui/core/styles";

import image from "../TEST-images/apple-touch-icon.png";
import AddProject from "./AddProject";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  avatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "none"
  },
  connectButton: {
    margin: theme.spacing(1),
    textTransform: "none",
    backgroundColor: "#35DE86",
    color: grey[50]
  },
  card: {
    margin: theme.spacing(5)
  },
  skillCard: {
    margin: theme.spacing(5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  left: {
    //background: "linear-gradient(to bottom, #F6F6F7, #F6F6F7)"
  },
  right: {
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(9)
  },
  appBar: {
    color: "#000",
    backgroundColor: "#fff",
    boxShadow: "none",
    margin: theme.spacing(2)
  },
  tab: {
    textTransform: "none"
  }
}));

function TabContainer(props) {
  return <Typography style={{ padding: 10 }}>{props.children}</Typography>;
}

function Profile(props) {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [yearsexp, setYearsexp] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch("/api/user/" + localStorage.getItem("user_id"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          setUsername(res.username);
          setLocation(res.location);
          setYearsexp(res.yearsexp);
          setDescription(res.description);
          setSkills(res.skills);
        });
    };

    fetchData();
  }, []);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handleDelete = skill => () => {
    fetch("/api/user/" + localStorage.getItem("user_id") + "/skill", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      },
      body: JSON.stringify({
        name: skill.name,
        id: skill.id
      })
    }).then(res => {
      if (res.status === 200) {
      }
    });
  };

  return (
    <Grid container className={classes.root} justify="space-between">
      <Navigation />
      <Grid container justify="space-between">
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          className={classes.left}
          component={Paper}
          elevation={4}
        >
          <Grid item>
            <div align="center">
              <Avatar
                className={classes.avatar}
                src={image}
                alt="User Profile Picture"
              />
              <EditModal />
              <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                {username}
              </Box>
              <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                {location}
              </Box>

              <div>
                <Button variant="contained" className={classes.connectButton}>
                  Connect
                </Button>
                <Button variant="contained" className={classes.button}>
                  Message
                </Button>
              </div>
            </div>
          </Grid>

          <Grid item>
            <div className={classes.skillCard} align="center">
              <Box
                fontWeight="fontWeightBold"
                fontSize="fontSize"
                style={{ margin: "15px" }}
              >
                Skills:
              </Box>
              {skills.map(data => {
                return (
                  <Chip
                    key={data.id}
                    label={data.name}
                    className={classes.chip}
                    onDelete={handleDelete(data)}
                  />
                );
              })}
            </div>
          </Grid>
          <Grid item>
            <div className={classes.card} align="center">
              <Box fontWeight="fontWeightBold" fontSize="fontSize">
                Years of Experience:
              </Box>
              <div
                style={{
                  margin: "5px",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "5px",
                  backgroundColor: "grey",
                  display: "grid",
                  alignContent: "center"
                }}
              >
                {yearsexp}
              </div>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.card} align="center">
              <Box fontWeight="fontWeightBold" fontSize="fontSize">
                About:
              </Box>
              <Box fontSize="fontSize">{description}</Box>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={9} sm={9} md={9} className={classes.right}>
          <Grid container justify="space-evenly">
            <Grid item xs={12}>
              <AppBar position="static" className={classes.appBar}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                  <Tab className={classes.tab} label="Projects" />
                  <Tab className={classes.tab} label="GitHub Contributions" />
                  <Tab
                    className={classes.tab}
                    label="Education and courseworks"
                  />
                </Tabs>
              </AppBar>
            </Grid>
            <Grid item>
              {value === 0 && (
                <TabContainer>
                  <Grid container justify="flex-start">
                    <AddProject />
                  </Grid>
                </TabContainer>
              )}
              {value === 1 && <TabContainer>Item Two</TabContainer>}
              {value === 2 && <TabContainer>Item Three</TabContainer>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withRouter(Profile);

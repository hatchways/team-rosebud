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
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import earth from "../TEST-images/earth.jpg";

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
  projectCard: {
    width: "25%",
    height: "25%",
    margin: theme.spacing(3)
  },
  tab: {
    textTransform: "none"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

function TabContainer(props) {
  return <Typography style={{ padding: 10 }}>{props.children}</Typography>;
}

function Profile(props) {
  const { params } = props.match;

  var user = false;

  if (localStorage.getItem("user_id") === params.id) {
    user = true;
  }

  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [yearsexp, setYearsexp] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [connected, setConnected] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      fetch("/api/user/" + params.id, {
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

    const fetchProjects = async () => {
      fetch("/api/user/" + params.id + "/projects", {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          setProjects(res.projects);
        });
    };

    const checkConnection = async () => {
      fetch("/api/connect", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          connected_to: params.id
        })
      }).then(res => {
        if (res.status === 400) setConnected(false);
        else setConnected(true);
      });
    };

    fetchData();
    fetchProjects();
    checkConnection();
  }, [params.id]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function stopRefresh(e) {
    setLocation(e.location);
    setYearsexp(e.yearsexp);
    setDescription(e.description);
  }

  const handleDelete = skill => () => {
    fetch("/api/user/" + params.id + "/skill", {
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
        const valueToRemove = skill;
        const filteredSkills = skills.filter(item => item !== valueToRemove);
        setSkills(filteredSkills);
      }
    });
  };

  function handleConnection() {
    fetch("/api/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"),
        connected_to: params.id
      })
    }).then(res => {
      if (res.status === 200) setConnected(true);
    });
  }

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
              {user === true ? (
                <div>
                  <EditModal onChange={stopRefresh} />
                </div>
              ) : (
                <p />
              )}
              <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                {username}
              </Box>
              <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                {location}
              </Box>
              <div>
                {user === false ? (
                  <div>
                    {connected === false ? (
                      <Button
                        variant="contained"
                        className={classes.connectButton}
                        onClick={handleConnection}
                      >
                        Connect
                      </Button>
                    ) : (
                      <p />
                    )}

                    <Button variant="contained" className={classes.button}>
                      Message
                    </Button>
                  </div>
                ) : (
                  <p />
                )}
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
            <Grid item style={{ width: "inherit" }}>
              {value === 0 && (
                <TabContainer style={{ padding: "20px" }}>
                  {user === true ? (
                    <div>
                      <AddProject />
                    </div>
                  ) : (
                    <p />
                  )}
                  <Grid
                    container
                    direction="column-reverse"
                    justify="flex-start"
                  >
                    {projects.map(project => {
                      return (
                        <Card elevation={4} className={classes.projectCard}>
                          <CardMedia className={classes.media} image={earth} />
                          <Grid
                            container
                            direction="column"
                            justify="space-evenly"
                            alignItems="flex-start"
                            style={{ margin: "10px" }}
                          >
                            <Typography variant="h6">{project.name}</Typography>
                            <Typography variant="caption">
                              {project.githubLink}
                            </Typography>
                            <Typography variant="caption">
                              {project.demoLink}
                            </Typography>
                          </Grid>
                        </Card>
                      );
                    })}
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

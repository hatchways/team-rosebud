import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import InputBase from "@material-ui/core/InputBase";
import { grey } from "@material-ui/core/colors";

import Navigation from "./Navigation";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(35),
    borderRadius: "0"
  },
  expand: {
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.standard
    })
  },
  expandOpen: {
    //transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500],
    margin: 8,
    width: 60,
    height: 60
  },
  root: {
    margin: theme.spacing(20),
    marginTop: theme.spacing(4),
    borderRadius: "0"
  },
  searchIcon: {
    color: "#35DE86",
    margin: theme.spacing(2)
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    width: "100hv"
  },
  searchInput: {
    flex: 1,
    marginRight: theme.spacing(2)
  },
  filterButton: {
    padding: theme.spacing(2),
    width: "20%",
    textTransform: "none",
    background: "#FFFFFF",
    borderRadius: 0,
    borderWidth: 0,
    borderLeftWidth: 1,
    borderColor: grey[300],
    "&:hover": {
      background: "transparent"
    }
  },

  filterButtonOpen: {
    background: "#35DE86"
  },

  filterIcon: {
    marginRight: theme.spacing(1)
  },
  form: {
    padding: theme.spacing(2)
  },
  formControl: {
    minWidth: "80%"
  },
  chip: {
    margin: 1,
    container: {
      size: "25%"
    }
  },
  button: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(0),
    height: "100%",
    minHeight: 50,
    textTransform: "none",
    width: "15%"
  },
  usersCardContainer: {
    marginTop: theme.spacing(2)
  },
  usersCard: {
    width: "25%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(2)
  },
  innerGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  outerGrid: {
    height: "100%"
  },
  divider: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function Discover() {
  const classes = useStyles();
  const [dummy, setDummy] = useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [values, setValues] = useState({
    location: "",
    yoe: ""
  });
  const [chipData, setChipData] = useState([]);
  const [skill, setSkill] = useState("");
  const [popularSkills, setPopularSkills] = useState([
    "JavaScript",
    "SQL",
    "JQuery",
    "Wordpress",
    "BootStrap",
    "HTML",
    "CSS",
    "AJAX",
    "Angular"
  ]);
  const [users, setUsers] = useState([]);
  const [partialFilter, setPartialFilter] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          setUsers(res.items);
          setPartialFilter(res.items);
          setFilteredUsers(res.items);
        });
    };
    fetchData();
  }, []);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  const handlePartialFilter = () => {
    let newList = users.filter(user => {
      const lc = user.location.toLowerCase();
      const filter = values.location.toLowerCase();
      return lc.includes(filter);
    });

    newList = newList.filter(user => {
      return user.yearsexp >= values.yoe;
    });
    setPartialFilter(newList);
    handleSearch(searchBy, newList);
    setExpanded(false);
  };

  const handleSearch = (e, partialFilter) => {
    let currentList = [];
    let newList = [];
    if (e !== "") {
      currentList = partialFilter;
      newList = currentList.filter(user => {
        const lc =
          user.username.toLowerCase() +
          user.location.toLowerCase() +
          user.email.toLowerCase();
        const filter = e.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = partialFilter;
    }
    setFilteredUsers(newList);
  };
  const handleReset = () => {
    setValues(oldValues => ({
      ...oldValues,
      location: "",
      yoe: ""
    }));
    setDummy(!dummy);
  };

  const handleDelete = chipToDelete => () => {
    setChipData(chips =>
      chips.filter(chip => chip.label !== chipToDelete.label)
    );
    popularSkills.push(chipToDelete.label);
  };

  const addSkills = data => {
    if (!data) return;
    chipData.push({ key: chipData.length, label: data });
    setSkill("");
    setPopularSkills(chips => chips.filter(chip => chip !== data));
    setDummy(!dummy);
  };

  return (
    <Grid container justify="center">
      <Navigation />
      <Grid container direction="column" justify="center">
        <Card className={classes.card}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.searchBar}
              direction="row"
              justify="space-between"
            >
              <Icon className={classes.searchIcon}>search</Icon>
              <InputBase
                className={classes.searchInput}
                value={searchBy}
                placeholder="Search"
                onChange={e => {
                  setSearchBy(e.target.value);
                  handleSearch(e.target.value, partialFilter);
                }}
              />
              <Button
                variant="outlined"
                className={clsx(classes.filterButton, {
                  [classes.filterButtonOpen]: expanded
                })}
                onClick={handleExpandClick}
              >
                <Icon className={classes.filterIcon}>tune</Icon>
                Filters
              </Button>
            </Grid>
          </Grid>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent style={{ backgroundColor: "#EEEEEE" }}>
              <Grid container direction="row" justify="center">
                <Grid item xs={4}>
                  <form className={classes.form}>
                    <FormControl className={classes.formControl}>
                      <Typography>Location:</Typography>
                      <Select
                        displayEmpty
                        input={<OutlinedInput name="location" />}
                        value={values.location}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Canada"}>Canada</MenuItem>
                        <MenuItem value={"Toronto"}>Toronto</MenuItem>
                        <MenuItem value={"North York"}>North York</MenuItem>
                        <MenuItem value={"Mississauga"}>Mississauga</MenuItem>
                        <MenuItem value={"Brampton"}>Brampton</MenuItem>
                        <MenuItem value={"Montreal"}>Montreal</MenuItem>
                        <MenuItem value={"Vancouver"}>Vancouver</MenuItem>
                        <MenuItem value={"Calgary"}>Calgary</MenuItem>
                        <MenuItem value={"Ottawa"}>Ottawa</MenuItem>
                        <MenuItem value={"Winnipeg"}>Winnipeg</MenuItem>
                        <MenuItem value={"Quebec"}>Quebec</MenuItem>
                        <MenuItem value={"Kitchener"}>Kitchener</MenuItem>
                        <MenuItem value={"Hamilton"}>Hamilton</MenuItem>
                        <MenuItem value={"London"}>London</MenuItem>
                        <MenuItem value={"Windsor"}>Windsor</MenuItem>
                        <MenuItem value={"Edmonton"}>Edmonton</MenuItem>
                      </Select>

                      <Typography style={{ marginTop: "20px" }}>
                        Years of Experience:
                      </Typography>
                      <Select
                        input={<OutlinedInput name="yoe" />}
                        value={values.yoe}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>1+ years</MenuItem>
                        <MenuItem value={2}>2+ years</MenuItem>
                        <MenuItem value={3}>3+ years</MenuItem>
                        <MenuItem value={5}>5+ years</MenuItem>
                        <MenuItem value={7}>7+ years</MenuItem>
                        <MenuItem value={10}>10+ years</MenuItem>
                        <MenuItem value={12}>12+ years</MenuItem>
                        <MenuItem value={15}>15+ years</MenuItem>
                        <MenuItem value={20}>20+ years</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                </Grid>
                <Grid item xs={7}>
                  <form className={classes.form}>
                    <Typography>Skills:</Typography>
                    {chipData.map(data => {
                      return (
                        <Chip
                          className={classes.chip}
                          key={data.key}
                          label={data.label}
                          onDelete={handleDelete(data)}
                        />
                      );
                    })}
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="skills"
                      name="skills"
                      value={skill}
                      onChange={e => setSkill(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkills(e.target.value);
                        }
                      }}
                    />
                    <Typography style={{ marginTop: "30px" }}>
                      Select from popular skills:
                    </Typography>
                    {popularSkills.map((data, i) => {
                      return (
                        <Chip
                          className={classes.chip}
                          key={i}
                          label={data}
                          onClick={e => addSkills(data)}
                          //onDelete={handleDelete(data)}
                        />
                      );
                    })}
                  </form>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Grid direction="row" container justify="center">
                <Button
                  variant="contained"
                  style={{ background: "#35DE86" }}
                  className={classes.button}
                  onClick={handlePartialFilter}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={e => setExpanded(false)}
                >
                  Close
                </Button>
              </Grid>
            </CardContent>
          </Collapse>
          <Divider />
          <Grid
            container
            justify="center"
            className={classes.usersCardContainer}
          >
            {filteredUsers.map(data => {
              return (
                <Card elevation={4} className={classes.usersCard}>
                  <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    className={classes.outerGrid}
                  >
                    <Grid container direction="column" alignItems="center">
                      <Avatar className={classes.avatar}>
                        {data.username.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="h6">{data.username}</Typography>
                      <Typography variant="caption">{data.location}</Typography>
                      <Divider className={classes.divider} />
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      className={classes.innerGrid}
                    >
                      {data.skills.map(skill => {
                        return (
                          <Chip
                            variant="outlined"
                            className={classes.chip}
                            label={skill.name}
                          />
                        );
                      })}
                    </Grid>

                    <Grid container direction="column" alignItems="center">
                      <Divider className={classes.divider} />
                      {data.yearsexp} years of experience
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default withRouter(Discover);

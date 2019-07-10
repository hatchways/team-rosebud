import React from "react";

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EditModal from "./EditModal";

import { makeStyles } from "@material-ui/core/styles";

import image from '../TEST-images/apple-touch-icon.png';
import grandTour from '../TEST-images/grand_tour.jpg';
import mars from '../TEST-images/mars.jpg';
import earth from '../TEST-images/earth.jpg';
import venus from '../TEST-images/venus.jpg';
import ceres from '../TEST-images/ceres.jpg';
import jupiter from '../TEST-images/jupiter.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: "#ecf542",
  },
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  button: {
    margin: theme.spacing(1),
  },
  card: {
    margin: 25,
  },
  chip: {
    margin: 2
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  left: {
    // backgroundColor: "#f54842",
    height: '100%',
  },
  right:{
    // backgroundColor: "#42f55d",
    height: '100%',
  },
  // control: {
  //   padding: theme.spacing(2)
  // }
}));

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function Profile() {
  const classes = useStyles()

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return(
      <Grid container className={classes.root} alignContent="flex-start">
        <Grid item xs={4} className={classes.left}>
            <Grid container justify="space-evenly" alignItems="center" direction="column">
              <Grid item>
                <div className={classes.card} align="center">
                    <Avatar className={classes.avatar} src={image} alt="User Profile Picture"/>
                    <EditModal />
                      <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                        Warren Shellman
                      </Box>
                      <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                        Toronto, ON
                      </Box>

                  <div>
                    <Button variant="contained" color="primary" className={classes.button}>
                      Connect
                    </Button>
                    <Button variant="contained" className={classes.button}>
                      Message
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.card} align="center">
                    <Box fontWeight="fontWeightBold" fontSize="fontSize">
                      Skills:
                    </Box>
                  <Chip label="Basic Chip" className={classes.chip} />
                  <Chip label="Basic Chip" className={classes.chip} />
                  <Chip label="Basic Chip" className={classes.chip} />
                  <Chip label="Basic Chip" className={classes.chip} />
                  <Chip label="Basic Chip" className={classes.chip} />
                  <Chip label="Basic Chip" className={classes.chip} />
                </div>
              </Grid>
              <Grid item>
                <div className={classes.card} align="center">
                    <Box fontWeight="fontWeightBold" fontSize="fontSize">
                      Years of Experience:
                    </Box>
                  <div style={{ width: '2rem', height: '2rem', borderRadius: '5px', backgroundColor: 'darkslategray', display: 'grid', alignContent: 'center'}}>
                    <div>6</div>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.card} align="center">

                    <Box fontWeight="fontWeightBold" fontSize="fontSize">
                      About:
                    </Box>
                    <Box fontWeight="fontWeight" fontSize="fontSize">
                      Frontend development with 5+ years of experience.
                      I love working with Wordpress and page applications
                      development on React.
                    </Box>
                </div>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container className={classes.right} justify="center">
            <Grid container style={{margin: "5em 2.5em"}} >
              <Grid item xs={12}>
                <AppBar position="static">
                  <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                  </Tabs>
                </AppBar>
              </Grid>
              <Grid item>
                {value === 0 &&
                  <Grid container justify="center">
                    <Grid item>
                      <GridList className={classes.gridList} cols={3}>
                        <GridListTile>
                          <img src={grandTour} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={mars} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={earth} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={venus} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={ceres} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={jupiter} alt="" />
                        </GridListTile>
                      </GridList>
                      <Box fontWeight="fontWeightBold" fontSize="fontSize">
                        Project 1
                      </Box>
                    </Grid>
                    <Grid item>
                      <GridList className={classes.gridList} cols={3}>
                        <GridListTile>
                          <img src={grandTour} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={mars} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={earth} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={venus} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={ceres} alt="" />
                        </GridListTile>
                        <GridListTile>
                          <img src={jupiter} alt="" />
                        </GridListTile>
                      </GridList>
                      <Box fontWeight="fontWeightBold" fontSize="fontSize">
                        Project 1
                      </Box>
                    </Grid>
                  </Grid>
                }
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  )
}

export default Profile

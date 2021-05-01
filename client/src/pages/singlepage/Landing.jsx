import React from "react";
import {
  Grid,
  CssBaseline,
  Link,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../../components/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    height: "80vh",
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paperCenter: {
    height: "50vh",
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperLeft: {
    height: "50vh",
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  paperRight: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "right",
  },
  testPaper: {
    
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  navbar: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <Grid container component='main'>
      <CssBaseline />
      {/* Pull in Header Component */}
      <Grid item xs={12} className={classes.navbar}>
        <NavBar />
      </Grid>
      {/* Add Picture showing chill people gaming with link to register */}
      <Grid item xs={12} className={classes.image}>
        <Typography component='h1' variant='h1' align={"center"}>
          Unite with Gamers-aLike
        </Typography>
      </Grid>
      {/* Explain what they would get out of this website */}
      <Grid item xs={11} component={Paper} elevation={20}>
        <div className={classes.testPaper}>
          Welcome to Gamers-aLike. Where you don't have to stress about finding
          another gamer like you to play with with again.
        </div>
      </Grid>
      {/* Outline the steps to get do it */}
      {/* Push the register form */}
      {/* Footer Contact Info */}
    </Grid>
  );
};

export default Landing;

import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import cookie from "react-cookie";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  LockOutlinedIcon,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as Li } from "react-router-dom";
import UserContext from "../../../MyComponents/Context/UserContext";
import {
  signup,
  facebookSignup,
  googleSignup,
  twitterSignup,
  steamSignup,
  setUserContext,
} from "../../../utils/API";

import Social from "../SocialLinks";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' component={Li} to={"/"}>
        Gamers-aLike
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AccessPage() {
  // React Hooks
  const classes = useStyles();
  const history = useHistory();

  // States and State Changers
  const { setJWT, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [steamID, setSteamID] = useState("");
  const [battlenetID, setBattlenetID] = useState("");
  const [playStationID, setPlayStationID] = useState("");
  const [xboxID, setXboxID] = useState("");
  const [method, setMethod] = useState("");

  const handleEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleUsername = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleSignUp = async (
    e,
    expire,
    username,
    email,
    password,
    discordID,
    steamID,
    battlenetID,
    playStationID,
    xboxID
  ) => {
    e.preventDefault();
    const type = "siginup";
    let user;
    if (method === "local") {
      user = signup(
        expire,
        type,
        username,
        email,
        password,
        discordID,
        steamID,
        battlenetID,
        playStationID,
        xboxID
      );
    } else {
      method === "facebook"
        ? (user = await facebookSignup())
        : method === "google"
        ? (user = await googleSignup())
        : method === "twitter"
        ? (user = await twitterSignup())
        : (user = await steamSignup());

      const authToken = cookie.get("__AUTH");
      setUserContext(setUser, setJWT, user, authToken, history);
      // Switch to stepper
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
    setDiscordID("");
    setSteamID("");
    setBattlenetID("");
    setPlayStationID("");
    setXboxID("");
    setMethod("");
  }, []);

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => {
              handleSignUp(e, username, email, password);
            }}
            noValidate
          >
            <Social />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              value={username}
              onChange={handleUsername}
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              value={email}
              onChange={handleEmail}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='password'
              name='password'
              label='Password'
              type='password'
              value={password}
              onChange={handlePassword}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify='center'>
              <Grid item>
                <Link component={Li} to={"/Login"} variant='body2'>
                  {"Already have an account?"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

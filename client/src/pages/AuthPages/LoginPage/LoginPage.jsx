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
import { login, setUserContext } from "../../../utils/API";

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
  const classes = useStyles();
  const history = useHistory();

  const { setJWT, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expire, setExpire] = useState("1d");

  const handleEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleExpire = (e) => {
    const { value } = e.target;
    value === "1d" ? setExpire("1y") : setExpire("1d");
  };

  const handleLogin = async (e, email, password, expire) => {
    e.preventDefault();
    const type = "signin";
    const user = await login(email, password, expire, type);
    if (user) {
      const authToken = cookie.load("__AUTH");
      setUserContext(setUser, setJWT, user, authToken, history);
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setExpire("1d");
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
            Sign In
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => {
              handleLogin(e, email, password, expire);
            }}
            noValidate
          >
            <Social />
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
              autoComplete='email'
              autoFocus
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
              autoComplete='current-password'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={expire}
                  color='primary'
                  onChange={handleExpire}
                />
              }
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  {"Forgot Password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link component={Li} to={"/Signup"} variant='body2'>
                  {"Don't have an account? Sign Up"}
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

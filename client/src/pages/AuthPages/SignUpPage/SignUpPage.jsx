import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
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
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link as Li } from "react-router-dom";
import UserContext from "../../../MyComponents/Context/UserContext";
import API from "../../../utils/API";

import Social from "../SocialLinks";
import StepperForm from "./StepperForm";
import StepperConfirm from "./StepperConfirm";
import Stepper from "./Stepper";

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
  // ==========================
  //        React Hooks
  // ==========================
  const classes = useStyles();
  const history = useHistory();

  // ==============================
  // States and State Changers
  // ==============================
  const { setJWT, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expire, setExpire] = useState("1d");
  const [confirmPW, setConfirmPW] = useState("");
  const [username, setUsername] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [steamID, setSteamID] = useState("");
  const [battlenetID, setBattlenetID] = useState("");
  const [playStationID, setPlayStationID] = useState("");
  const [xboxID, setXboxID] = useState("");
  const [method, setMethod] = useState("");
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

  // ================================
  // Functions for state changing
  // ================================

  // Modal Handle Functions
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // User Handle Functions
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

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    setConfirmPW(value);
  };

  const handleUsername = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleDiscord = (e) => {
    const { value } = e.target;
    setDiscordID(value);
  };

  const handleSteam = (e) => {
    const { value } = e.target;
    setSteamID(value);
  };

  const handleBattlenet = (e) => {
    const { value } = e.target;
    setBattlenetID(value);
  };

  const handlePlaystation = (e) => {
    const { value } = e.target;
    setPlayStationID(value);
  };

  const handleXbox = (e) => {
    const { value } = e.target;
    setXboxID(value);
  };

  const handleCounter = (e, method, counter) => {
    e.preventDefault();
    setMethod("local");
    if (counter < 1) {
      let inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set("signup", method, { expires: inFifteenMinutes, path: "" });
      setCounter(1);
    }
  };

  // ==================================
  //        Main Sign Up Function
  // ==================================
  const handleSignUp = async () => {
    const type = "signup";
    if (method === "local") {
      let user = await API.signup(
        expire,
        type,
        email.trim(),
        username.trim(),
        password.trim(),
        discordID.trim(),
        steamID.trim(),
        battlenetID.trim(),
        playStationID.trim(),
        xboxID.trim()
      );
      let authToken = Cookies.get("__AUTH").split(":")[1];
      Cookies.remove("signup", method, { path: "" });
      API.setUserContext(setUser, setJWT, user, authToken, history);
    } else {
      // TODO: Get update user route place and
      if (Cookies.get("__AUTH")) {
        // let authToken = Cookies.get("__AUTH").split(":")[1];
        // API.setUserContext(setUser, setJWT, user, authToken, history);
      } else {
        history.push("/login");
      }
    }
  };

  // ============================
  //        Stepper Changer
  // ============================
  const nextStep = (e, step) => {
    e.preventDefault();
    step >= 3 ? setStep(3) : setStep(step + 1);
  };

  const backStep = (step) => {
    step === 1 ? setStep(1) : setStep(step - 1);
  };

  // ============================
  //      On Load Functions
  // ============================
  useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
    setDiscordID("");
    setSteamID("");
    setBattlenetID("");
    setPlayStationID("");
    setXboxID("");
  }, []);

  // useEffect(() => {
  //   if (!cookies.signup) {
  //     setMethod("");
  //     setStep(0);
  //   } else {
  //     setStep(1);
  //     cookies.signup.value === "local"
  //       ? setMethod("local")
  //       : setMethod("non-local");
  //   }
  // }, []);

  // ======================================
  //     Prop Values/Methods Variables
  // ======================================
  const userDefaults = [
    { value: email, name: "Email", method: handleEmail },
    { value: username, name: "Username", method: handleUsername },
    { value: password, name: "Password", method: handlePassword },
    {
      value: confirmPW,
      name: "Confirm Password",
      method: handleConfirmPassword,
    },
  ];

  const gamerIDs = [
    { value: discordID, name: "Discord ID", method: handleDiscord },
    { value: steamID, name: "Steam Username", method: handleSteam },
    { value: battlenetID, name: "BattleNet ID", method: handleBattlenet },
    { value: playStationID, name: "Playstation ID", method: handlePlaystation },
    { value: xboxID, name: "Xbox Gamertag", method: handleXbox },
  ];

  const allSentValues = [
    { value: email, name: "Email" },
    { value: username, name: "Username" },
    { value: password, name: "Password" },
    { value: discordID, name: "Discord ID" },
    { value: steamID, name: "Steam Username" },
    { value: battlenetID, name: "BattleNet ID" },
    { value: playStationID, name: "Playstation ID" },
    { value: xboxID, name: "Xbox Gamertag" },
  ];

  const modal = {
    state: open,
    closeModal: handleClose,
    openModal: handleClickOpen,
  };

  const stepValues = {
    steps: step,
    next: nextStep,
    back: backStep,
    openModal: handleClickOpen,
    submit: handleSignUp,
  };

  // =============================================
  //                  Switch Case
  // =============================================

  switch (step) {
    case 1:
      return (
        <>
          <StepperForm
            classes={classes}
            valueMethods={userDefaults}
            step={stepValues}
            Stepper={<Stepper info={stepValues} />}
          />
        </>
      );
    case 2:
      return (
        <>
          <StepperForm
            classes={classes}
            valueMethods={gamerIDs}
            step={stepValues}
            Stepper={<Stepper info={stepValues} />}
          />
        </>
      );
    case 3:
      return (
        <>
          <StepperConfirm
            classes={classes}
            values={allSentValues}
            step={stepValues}
            modal={modal}
            Stepper={<Stepper info={stepValues} />}
          />
        </>
      );
    default:
      return (
        <Grid container component='main' className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                  nextStep(e, step);
                  handleCounter(e, method, counter);
                }}
              >
                <Social type='signup' method={setMethod} />
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
                  control={
                    <Checkbox
                      value={expire}
                      onChange={handleExpire}
                      color='primary'
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
}

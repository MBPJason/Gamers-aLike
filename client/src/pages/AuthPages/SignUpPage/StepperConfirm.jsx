import React, { useState } from "react";
import {
  Grid,
  CssBaseline,
  Paper,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import classNames from "classnames";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function Step1(props) {
  const { classes, values, step, modal, Stepper } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Grid
        container
        justify='center'
        component='main'
        className={classNames(classes.root, classes.image)}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={9}>
          <div className={classes.paper}>
            <Typography component='h2' variant='h4'>
              Confirm Your Choices
            </Typography>
            <form className={classes.form} onSubmit={modal.openModal}>
              {values.map(
                (state) =>
                  state.value.trim() && (
                    <TextField
                      key={state.name.toLowerCase().split(" ")[0]}
                      variant='outlined'
                      margin='normal'
                      disabled
                      fullWidth
                      type={
                        state.name === "Password"
                          ? "password"
                          : state.name === "Password" && showPassword
                          ? "text"
                          : "text"
                      }
                      id={state.name.toLowerCase().split(" ")[0]}
                      label={state.name}
                      name={state.name.toLowerCase().split(" ")[0]}
                      value={state.value}
                      InputProps={{
                        endAdornment: state.name === "Password" && (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              edge='end'
                              onClick={handleShowPassword}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )
              )}
              {Stepper}
            </form>
            <div>
              <Dialog
                open={modal.state}
                onClose={modal.closeModal}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {"Is this fine with you?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    This will be your user. Don't worry you will be able to
                    change most stuff later
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={modal.closeModal} color='secondary'>
                    Let me rethink this..
                  </Button>
                  <Button onClick={step.submit} color='primary' autoFocus>
                    This is fine.
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

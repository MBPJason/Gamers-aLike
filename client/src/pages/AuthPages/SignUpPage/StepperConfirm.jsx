import React from "react";
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
} from "@material-ui/core";
import classNames from "classnames";

export default function Step1(props) {
  const { classes, values, step, modal, Stepper } = props;

  return (
    <>
      <Grid container justify='center' component='main'>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={9}>
          <div className={classes.paper}>
            <Typography component='h1' variant='h3'>
              Confirm Your Choices
            </Typography>
            <form
              className={classes.form}
              onSubmit={modal.openModal}
            >
              {values.map(
                (state) =>
                  state.value.trim() && (
                    <TextField
                      key={state.name.toLowerCase().split(" ")[0]}
                      variant='outlined'
                      margin='normal'
                      disabled
                      fullWidth
                      id={state.name.toLowerCase().split(" ")[0]}
                      label={state.name}
                      name={state.name.toLowerCase().split(" ")[0]}
                      value={state.value}
                    />
                  )
              )}
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
                      This will be your user. Don't worry you will be able to change most stuff later
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
              {Stepper}
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

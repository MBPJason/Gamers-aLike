import React from "react";
import {
  Grid,
  CssBaseline,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import classNames from "classnames";

export default function Step1(props) {
  const { classes, userDefault, userDefaultMethod, Step, Stepper } = props;
  return (
    <>
      <Grid container justify='center' component='main'>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={9}>
          <div className={classes.paper}>
            <Typography component='h1' variant='h3'>
              Make your user
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => {
                Step.nextStep(e);
              }}
            >
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                value={userDefault.username}
                onChange={userDefaultMethod.handleUsername}
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
                value={userDefault.email}
                onChange={userDefaultMethod.handleEmail}
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
                value={userDefault.password}
                onChange={userDefaultMethod.handlePassword}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='confirmPW'
                name='Confirm password'
                label='Confirm password'
                type='password'
                value={userDefault.password}
                onChange={userDefaultMethod.handlePassword}
              />
              {Stepper}
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

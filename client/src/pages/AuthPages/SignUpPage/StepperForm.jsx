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
  const { classes, valueMethods, step, Stepper } = props;
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
                step.nextStep(e, step.step);
              }}
            >
              {valueMethods.map((valueMethod) => (
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id={valueMethod.value}
                  label={valueMethod.name}
                  name={valueMethod.name}
                  value={valueMethod.value}
                  onChange={valueMethod.method}
                  autoFocus
                />
              ))}

              {Stepper}
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

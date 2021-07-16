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
  const { classes, valueMethods, Title, step, Stepper } = props;
  return (
    <>
      <Grid container justify='center' component='main'>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={9}>
          <div className={classes.paper}>
            <Typography component='h1' variant='h3'>
              {Title}
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => {
                step.nextStep(e, step.step);
              }}
            >
              {valueMethods.map((valueMethod) => (
                <TextField
                  key={valueMethod.name.toLowerCase().split(" ")[0]}
                  variant='outlined'
                  margin='normal'
                  required={valueMethods.length > 4 && valueMethods.length < 5 ? false : true}
                  fullWidth
                  id={valueMethod.name.toLowerCase().split(" ")[0]}
                  label={valueMethod.name}
                  name={valueMethod.name.toLowerCase().split(" ")[0]}
                  value={valueMethod.value}
                  onChange={valueMethod.method}
                  error={
                    valueMethod.name === "Confirm Password" &&
                    valueMethod.value !== valueMethods[2].value
                      ? true
                      : false
                  }
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

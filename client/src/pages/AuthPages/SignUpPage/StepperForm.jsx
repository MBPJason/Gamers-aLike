import React, { useState } from "react";
import {
  Grid,
  CssBaseline,
  Paper,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import classNames from "classnames";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function Step1(props) {
  const { classes, valueMethods, Title, step, Stepper } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const displayHidden = (name) => {
    if (name === "Password") {
      if (showPassword) {
        return "text";
      } else {
        return "password";
      }
    } else {
      if (showConfirm) {
        return "text";
      } else {
        return "password";
      }
    }
  };

  return (
    <>
      <Grid
        container
        justify='center'
        className={classNames(classes.root, classes.image)}
        component='main'
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={9}>
          <div className={classes.paper}>
            <Typography component='h2' variant='h4'>
              {Title}
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => {
                step.next(e);
              }}
            >
              {valueMethods.map((valueMethod) => (
                <TextField
                  key={valueMethod.name.toLowerCase().split(" ")[0]}
                  variant='outlined'
                  margin='normal'
                  required={valueMethods.length > 4 ? false : true}
                  fullWidth
                  id={valueMethod.name.toLowerCase().split(" ")[0]}
                  label={valueMethod.name}
                  name={valueMethod.name.toLowerCase().split(" ")[0]}
                  value={valueMethod.value}
                  onChange={valueMethod.method}
                  type={
                    valueMethod.name === "Confirm Password" ||
                    valueMethod.name === "Password"
                      ? displayHidden(valueMethod.name)
                      : "text"
                  }
                  InputProps={{
                    endAdornment: (valueMethod.name === "Password" ||
                      valueMethod.name === "Confirm Password") && (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          edge='end'
                          onClick={
                            valueMethod.name === "Password"
                              ? handleShowPassword
                              : handleShowConfirm
                          }
                        >
                          {valueMethod.name === "Password" &&
                            (showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            ))}
                          {valueMethod.name === "Confirm Password" &&
                            (showConfirm ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            ))}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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

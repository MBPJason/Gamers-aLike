import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Fill out all fields",
    "Enter any gamertags you have",
    "Confirm Profile",
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 1:
      return "Constructing User Base...";
    case 2:
      return "Got anymore of that sweet, sweet gamer info?";
    case 3:
      return "Let's see what got here...";
    default:
      return "You shouldn't be here";
  }
}

export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const { info } = props;
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={info.steps} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(info.steps)}
          </Typography>
          <div>
            <Button
              disabled={info.steps === 1}
              onClick={info.back}
              className={classes.backButton}
            >
              Back
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={
                info.steps === 3
                  ? (e) => info.openModal(e)
                  : (e) => info.next(e, info.steps)
              }
            >
              {info.steps === 3 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

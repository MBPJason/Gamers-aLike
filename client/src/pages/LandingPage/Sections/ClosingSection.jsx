import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/imagesStyles";

// Core Logic and Components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "../../../components/CustomButtons/Button.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function ClosingSection() {
  const classes = useStyles();

  return (
    <div>
      <GridContainer justify='center'>
        {/* Beginning Closing Remark */}
        <GridItem xs={12} sm={12} md={11}></GridItem>
      </GridContainer>
      <div className={classes.imgGallery}>
        <GridContainer justify='center'>
          {/* 3 pictures */}
          <GridItem xs={12} sm={12} md={4}></GridItem>
          <GridItem xs={12} sm={12} md={4}></GridItem>
          <GridItem xs={12} sm={12} md={4}></GridItem>
        </GridContainer>
      </div>
      <div>
        <GridContainer justify='center'>
          {/* Ending Closing Remark */}
          <GridItem xs={12} sm={12} md={11}>
            <h2> So what are you waiting for?</h2>
              <Button
                component={Link}
                to={{pathname: "/Signup", form:"SignUp"}}
                color='danger'
                size='lg'
                round
                fullWidth
              >
                Join Up Today
              </Button>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

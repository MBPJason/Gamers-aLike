import React from "react";

// Stylesheets
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/montageStyle";

// Core Logic and Components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import VideoScroll from "../../../MyComponents/VideoScroll/VideoScroll";

const useStyles = makeStyles(styles);

export default function MontageSection() {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={11}>
          <VideoScroll />
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer justify='center'> 
          <GridItem xs={12} sm={12} md={11}>
            <h3 className={classes.title}>
              Most importantly... remember to have fun!
            </h3>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

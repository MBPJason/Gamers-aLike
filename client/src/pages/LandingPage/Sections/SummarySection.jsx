import React from "react";

import {makeStyles} from "material-ui/core/styles";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import InfoArea from "../../../components/InfoArea/InfoArea";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";

const useStyles = makeStyles(styles);

export default function SummarySection() {
    const classes = useStyles();

    return(
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <h2 className={classes.title}>Missing that 5th or 6th?</h2>
                </GridItem>
            </GridContainer>
        </div>
    )
}

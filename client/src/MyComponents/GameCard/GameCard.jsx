import React, { useState } from "react";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Button,
  ButtonGroup,
  Box,
  Typography,
} from "@material-ui/core";
import PeopleCardFooter from "@mui-treasury/components/cardFooter/people";

export default function GameCard(props) {
  const { slug, image, name, faces, width, root } = props;
  return (
    <>
      <Card id={slug} className={root}>
        <CardActionArea>
          <CardMedia component='img' alt='Game 1' height='auto' image={image}>
            <Grid container justify='center'>
              <Grid item>
                <Typography variant='h2'>{name}</Typography>
              </Grid>
            </Grid>
          </CardMedia>
        </CardActionArea>
        <CardActions>
          <ButtonGroup>
            <Button size='small'>Quick Join Lobby</Button>
            <Button>Create a Lobby</Button>
          </ButtonGroup>
        </CardActions>
        <Box minWidth={width}>
          <PeopleCardFooter faces={faces} />
        </Box>
      </Card>
    </>
  );
}

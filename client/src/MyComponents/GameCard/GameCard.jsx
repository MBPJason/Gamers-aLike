import React from "react";

import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";

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
  const { slug, image, name, faces, width, root, title } = props;
  const mediaStyles = useCoverCardMediaStyles();

  return (
    <>
      <Card id={slug} className={root}>
        <CardActionArea>
          <CardMedia component='img' className={mediaStyles} image={image} />
          <Typography component='h5' variant='h5' className={title}>
            {name}
          </Typography>
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

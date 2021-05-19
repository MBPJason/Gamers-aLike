import React from "react";

import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Paper,
  CardMedia,
  Button,
  Box,
  Avatar,
  Typography,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import PeopleCardFooter from "@mui-treasury/components/cardFooter/people";

export default function GameCard(props) {
  const { slug, image, name, faces, width, root, title } = props;
  const mediaStyles = useCoverCardMediaStyles();

  const Avatars = (
    <>
      {faces.map((face) => (
        <Avatar alt='face' src={face} />
      ))}
    </>
  );

  return (
    <div className={root}>
      <Card component={Paper} elevation={4} id={slug}>
        <CardActionArea>
          <CardMedia component='img' image={image} />
        </CardActionArea>
        <CardActionArea>
          <AvatarGroup max={4} spacing='small'>{Avatars}</AvatarGroup>
        </CardActionArea>
      </Card>
      <Typography variant='h6' className={title}>
        {name}
      </Typography>
    </div>
  );
}

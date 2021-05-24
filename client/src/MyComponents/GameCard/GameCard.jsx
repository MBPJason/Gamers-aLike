import React from "react";

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
import { AvatarGroup } from "@material-ui/lab";


export default function GameCard(props) {
  const { slug, image, name, faces, width, root, title } = props;

  // TODO: Include onClick functions for AvatarGroup, CardImage, CardTitle and GameGenres
  // TODO: Clean up styling for 4K monitors, there is too much space in between cards


  return (
    <>
      <Card component={Paper} elevation={4} id={slug} className={root}>
        <CardActionArea>
          <CardMedia component='img' image={image} />
        </CardActionArea>
        <CardActionArea>
          <AvatarGroup max={4}>
          {/* TODO: Include key prop */}
            {faces.map((face) => (
              <Avatar alt='face' src={face} />
            ))}
          </AvatarGroup>
        </CardActionArea>
      </Card>
      <Typography variant='h6' className={title}>
        {name}
      </Typography>
      {/* TODO: Display clickable genres to start a search with  */}
    </>
  );
}

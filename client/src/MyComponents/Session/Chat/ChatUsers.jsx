import React from "react";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Link,
} from "@material-ui/core";

export default function ChatUsers(props) {
  // These should be expandable cards when clicked on.
  // Perhaps a Context should be set up so it can be pulled from for usability anywhere

  const { usersList } = props;

  return (
    <List>
      {usersList.map((user, index) => (
        <ListItem
          alignItems='flex-start'
          key={"ListItem" + index}
          button
          onClick
        >
          <ListItemAvatar>
            <Avatar alt={user.username} src={user.userAvatar} />
          </ListItemAvatar>
          <ListItemText component={Link} primary={user.username} />
        </ListItem>
      ))}
    </List>
  );
}

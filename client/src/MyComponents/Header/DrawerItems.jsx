import React, { useState, useEffect } from "react";

// Dependencies/Components
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import useStyles from "../../assets/jss/myStyles/headerStyles";

// Icons
import InboxIcon from "@material-ui/icons/MoveToInbox";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleIcon from "@material-ui/icons/People";
import MailIcon from "@material-ui/icons/Mail";

// Items to map through
const drawerItems = [
  {
    text: "Among Us",
    icon: <NotificationsIcon />,
  },
  {
    text: "Friends List",
    icon: <PeopleIcon />,
  },
  {
    text: "Invites Sent",
    icon: <InboxIcon />,
  },
];

export default function DrawerItems({ desktop }) {
  const classes = useStyles();
  return (
    <div className={desktop ? classes.drawerContainer : classes.drawer}>
      <Divider />
      {/* List #1 */}
      <List>
        {drawerItems.map(({ text, icon }) => (
          <ListItem button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* List #2 (optional) */}
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

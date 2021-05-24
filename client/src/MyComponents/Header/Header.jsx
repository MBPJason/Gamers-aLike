import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import { Link as RouterLink } from "react-router-dom";
import DrawerItems from "./DrawerItems";
import ScreenSizeContext from "../../context/ScreenSizeContext";

// Stylesheet
import { useTheme } from "@material-ui/core/styles";
import useStyles from "../../assets/jss/myStyles/headerStyles";

// Material-UI components
import {
  AppBar,
  CssBaseline,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Drawer,
  Toolbar,
  Hidden,
  InputBase,
  Link,
} from "@material-ui/core";

// Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";

// ======================
// React component
// ======================
export default function ResponsiveDrawer(props) {
  // ScreenSize
  const { desktop } = useContext(ScreenSizeContext);
  // Props
  const ContentDisplay = props.content;

  // Styles
  const classes = useStyles();
  const theme = useTheme();

  // States
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [tabletOpen, setTabletOpen] = useState(false);

  // Function called when Component Mounted

  const handleTabletDrawer = () => {
    setTabletOpen(!tabletOpen);
  };

  const handleDesktopDrawer = () => {
    if (desktopOpen === true) {
      setDesktopOpen(!desktopOpen);
    } else {
      setDesktopOpen(true);
    }
  };

  // ===================
  // Desktop Drawer
  // ===================
  const desktopDrawer = (
    <Drawer
      className={classes.drawerDesktop}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant='persistent'
      open={desktopOpen}
    >
      <Toolbar />

      <DrawerItems desktop={desktop} />
    </Drawer>
  );

  // Container needed so the hidden drawer to display properly
  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;

  // ==================
  // Tablet Drawer
  // ==================
  const tabletDrawer = (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation='js'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={tabletOpen}
          onClose={handleTabletDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerItems desktop={desktop} />
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation='js'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={tabletOpen}
          onClose={handleTabletDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerItems desktop={desktop} />
        </Drawer>
      </Hidden>
    </nav>
  );

  // ===========================
  // Component Build
  // ===========================
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* App bar above the drawer and container */}
      <AppBar
        position='fixed'
        className={desktop ? classes.appBarDesktop : classes.appBarTablet}
      >
        {/* App bar content */}
        <Toolbar className={classes.toolbar}>
          <div id='menuDrawer'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={desktop ? handleDesktopDrawer : handleTabletDrawer}
              className={
                desktop ? classes.menuButtonDesktop : classes.menuButtonTablet
              }
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component={RouterLink}
              to={{ pathname: "/home" }}
              variant='h6'
              noWrap
            >
              Gamers-aLike
            </Typography>
          </div>
          <div id='searchbar' className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            {/* TODO: onChange Function needed */}
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div id='profileNotifications'>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* Check for which drawer should be called */}
      {desktop ? desktopDrawer : tabletDrawer}
      <main
        className={
          desktop
            ? classNames(classes.contentDesktop, {
                [classes.contentShiftDesktop]: desktopOpen,
              })
            : classes.contentTablet
        }
      >
        <Toolbar />
        {/* Main Content goes here */}

        {ContentDisplay}
      </main>
    </div>
  );
}

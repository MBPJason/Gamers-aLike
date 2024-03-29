import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Link as RouterLink } from "react-router-dom";
import DrawerItems from "./DrawerItems";

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
  Button,
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
  // Content
  const { content } = props;
  // Styles
  const classes = useStyles();
  const theme = useTheme();

  // States
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [tabletOpen, setTabletOpen] = useState(false);
  const [state, setState] = useState({
    desktopView: true,
    tabletView: false,
  });
  const { tabletView, desktopView } = state;

  // Function called when Component Mounted
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 960
        ? setState({
            desktopView: false,
            tabletView: true,
          })
        : setState({
            desktopView: true,
            tabletView: false,
          });
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

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

  // Desktop Drawer
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

      <DrawerItems desktop={desktopView} />
    </Drawer>
  );

  // Container needed so the hidden drawer to display properly
  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;

  // Tablet Drawer
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
          <DrawerItems desktop={desktopView} />
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
          <DrawerItems desktop={desktopView} />
        </Drawer>
      </Hidden>
    </nav>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* App bar above the drawer and container */}
      <AppBar
        position='fixed'
        className={
          desktopView === true ? classes.appBarDesktop : classes.appBarTablet
        }
      >
        {/* App bar content */}
        <Toolbar className={classes.toolbar}>
          <div>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={
                desktopView === true ? handleDesktopDrawer : handleTabletDrawer
              }
              className={
                desktopView === true
                  ? classes.menuButtonDesktop
                  : classes.menuButtonTablet
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <span>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </span>
        </Toolbar>
      </AppBar>
      {/* Check for which drawer should be called */}
      {tabletView ? tabletDrawer : desktopDrawer}
      <main
        className={
          desktopView
            ? classNames(classes.contentDesktop, {
                [classes.contentShiftDesktop]: desktopOpen,
              })
            : classes.contentTablet
        }
      >
        <Toolbar />
        {/* Main Content goes here */}

        {content}
      </main>
    </div>
  );
}

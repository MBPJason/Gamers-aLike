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
import MoreIcon from "@material-ui/icons/MoreVert";

export default function ResponsiveDrawer(props) {
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
      return window.innerWidth < 900
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

        <DrawerItems />
      </Drawer>
    );

  const container = props.window !== undefined ? () => props.window().document.body : undefined;

  // Tablet Drawer
  const tabletDrawer = (
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
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
            <DrawerItems />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
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
            <DrawerItems />
          </Drawer>
        </Hidden>
      </nav>
    );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={
          desktopView === true ? classes.appBarDesktop : classes.appBarTablet
        }
      >
        <Toolbar>
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
        </Toolbar>
      </AppBar>
      {tabletView ? tabletDrawer : desktopDrawer}
      <main
        className={classNames(classes.contentDesktop, {
          [classes.contentShiftDesktop]: desktopOpen,
        })}
      >
        <Toolbar />
        {/* Main Content goes here */}
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
}

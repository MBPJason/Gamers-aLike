import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerDesktop: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
  appBarDesktop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarTablet: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButtonDesktop: {
    marginRight: theme.spacing(2),
  },
  menuButtonTablet: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }, 
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  contentTablet: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentDesktop: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShiftDesktop: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default useStyles;

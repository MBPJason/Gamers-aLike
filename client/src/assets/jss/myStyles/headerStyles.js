import { fade, makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  // ===================
  // Drawer Classes
  // ===================
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
  drawerPaper: {
    width: drawerWidth,
  },

  // ===================
  // AppBar Classes
  // ===================
  appBarDesktop: {
    zIndex: theme.zIndex.drawer + 1,
    flexGrow: 1,
  },
  appBarTablet: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },

  // =======================
  // Menu Button Classes
  // =======================
  menuButtonDesktop: {
    marginRight: theme.spacing(2),
  },
  menuButtonTablet: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    justifyContent: "space-between",
    "& IconButton": {
      justifyContent: "flex-start",
    },
    "& Typography": {
      justifyContent: "flex-start",
    },
    "& div": {
      justifyContent: "center",
    },
    "& span": {
      justifyContent: "flex-end",
    },
  },

  // ==========================
  // Content Sizing Classes
  // ==========================
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

  // =======================
  // Search Bar Classes
  // =======================
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "70ch",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "55ch",
    },
  },
}));

export default useStyles;

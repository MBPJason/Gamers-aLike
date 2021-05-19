import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(2),
  },
  sectionTitle: {
    margin: theme.spacing(2, 0, 1, 0),
    textAlign: "left",
  },

  // ======================
  // Card Classes
  // ======================
  cardSize: {
    maxWidth: 200,
    margin: theme.spacing(1),
    borderRadius: 0,
    position: "relative",
    transition: "0.2s",

    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  cardTitle: {
    margin: theme.spacing(1, 0),
    textAlign: "left",
    fontSize: "12",
  },

  // =======================
  // Carousel Classes
  // =======================
  gridCarousel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  carouselImg: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  carouselPaper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  },

  // ==================
  // Table Classes
  // ==================
  tableDesktop: {
    minWidth: "10vw",
    backgroundColor: "gray",
    color: "antiquewhite",
  },
  tableBackground: {
    zIndex: "1",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backdropFilter: "blur(20px)",
  },
  tableRow: {
    "&:hover": {
      opacity: "1",
    },
  },
}));

export default useStyles;

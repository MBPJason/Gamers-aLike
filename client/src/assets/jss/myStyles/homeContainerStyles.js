import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(2),
  },
  cardSize: {
    maxWidth: 200,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: 0,
    position: "relative",
    transition: "0.2s",

    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  font: {
    position: "absolute",
    top: "20%",
    width: "100%",
    textAlign: "center",
    color: "white",
    backgroundColor: "none",
    fontSize: "12",
  },
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
}));

export default useStyles;

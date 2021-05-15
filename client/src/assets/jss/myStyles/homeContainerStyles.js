import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  carousel: {
    height: "600px",
    width: "auto",
  },
}));

export default useStyles;

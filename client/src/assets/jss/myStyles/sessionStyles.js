import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100%",
  },
  usersTab: {
    position: "relative",
    backgroundColor: "#3c59ff",
    color: "white",
    padding: theme.spacing(3),
  },
  chatBox: {
    position: "relative",
    backgroundColor: "white",
    padding: theme.spacing(5),
    "& Container": {
      minHeight: "70vh",
      "& ul": {
        position: "absolute",
        bottom: theme.spacing(6),
        left: theme.spacing(6),
      },
    },
    "& Grid ": {
      maxHeight: "5vh",
      "& form": {
        position: "absolute",
        bottom: theme.spacing(6),
        left: theme.spacing(6),
      },
    },
  },
  chatContainer: {
    position: "relative",
    border: "2px solid black",
    padding: theme.spacing(3),
    "& ul": {
      listStyle: "none",
      "& li": {},
    },
  },
  chatBubble: {
    margin: "10px",
  },
}));

export default useStyles;

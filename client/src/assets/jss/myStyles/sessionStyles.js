import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: "lightgray",
  },
  usersTab: {
    backgroundColor: "blue",
  },
  chatBox: {
    backgroundColor: "white",
  },
  chatContainer: {
    maxHeight: "85%",
    maxWidth: "100%",
    border: "2px solid black",
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
  chatBubble: {
    margin: "10px",
  },
}));

export default useStyles;

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  cardSize: {
    maxHeight: 400,
    maxWidth: 304,
    margin: theme.spacing(3, 2),
    borderRadius: 0,
    position: 'relative',
  },
  font: {
    position: "absolute",
    top: "20%",
    width: "100%",
    textAlign: "center",
    color: "white",
    backgroundColor: "none",
    
  }
}));

export default useStyles;

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    backdropFilter: "blur(20px) !important",
  },
  tableRow: {
    "&:hover": {
      opacity: "1",
    },
  },
}));

export default useStyles;

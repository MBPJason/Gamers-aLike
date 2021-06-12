import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // ============================
  // Session Container
  // ============================
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

  // ===========================
  // Chat Room Styling
  // ===========================
  clearfix: {
    content: '""',
    display: "block",
    clear: "both",
  },

  chatRoom: {
    padding: "5rem 20rem",
    animation: "$fadeChatApp 0.6s ease-in-out",
    animationFillMode: "forwards",
  },

  messagesTimeline: {
    display: "flex",
    height: "80vh",
    padding: "1rem",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    backgroundColor: "#fff",
    flexDirection: "column",
    overflowY: "auto",
  },

  messageBubble: {
    padding: "1rem 0 0 0",
    opacity: "0",
    transition: "all 0.15s ease-in-out",
    animation: "$fadeNewMessage 0.5s",
    animationFillMode: "forwards",
  },

  messageText: {
    position: "relative",
    maxWidth: "50%",
    minHeight: "40px",
    padding: "0.75rem",
    borderRadius: "4px",
    fontSize: "14px",
    lineHeight: "18px",
    fontWeight: "bold",
    boxShadow: theme.shadows[3],
    boxSizing: "border-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  messageRight: {
    "& div": {
      float: "right",
      boxShadow: theme.shadows[5],
    },
    "& $messageText": {
      float: "right",
      textAlign: "right",
      margin: "0 1rem 0 0",
      backgroundColor: "#fafafa",
      "&:after": {
        content: '""',
        position: "absolute",
        top: "14px",
        right: "-8px",
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: "6px 0 6px 10px",
        borderColor: "transparent transparent transparent #fafafa",
      },
    },
  },

  messageLeft: {
    "& div": {
      float: "left",
      boxShadow: theme.shadows[5],
    },
    "& $messageText": {
      float: "left",
      textAlign: "left",
      margin: "0 0 0 1rem",
      color: "#fff",
      backgroundColor: "#4870df",
      "&:before": {
        content: '""',
        position: "absolute",
        top: "14px",
        left: "-8px",
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: "6px 10px 6px 0",
        borderColor: "transparent #4870df transparent transparent",
      },
    },
  },

  isTyping: {
    position: "absolute",
    bottom: "2px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  isTypingDot: {
    position: "relative",
    left: "4px",
    display: "inline-block",
    width: "2px",
    height: "2px",
    backgroundColor: "#606060",
    animation: "$typingMessage 1.5s",
    animationFillMode: "forwards",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",

    "&:before, &:after": {
      content: '""',
      position: "absolute",
      display: "inline-block",
      width: "2px",
      height: "2px",
      backgroundColor: "#606060",
      animation: "$typingMessage 1.5s",
      animationFillMode: "forwards",
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
    },

    "&:before": {
      left: "4px",
      animationDelay: "0.5s",
    },
    "&:after": {
      left: "8px",
      animationDelay: "1s",
    },
  },

  // ===========================
  // Keyframes for Animation
  // ===========================
  "@keyframes fadeChatApp": {
    "0%": {
      opacity: "0",
      transform: "translateY(1rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0px)",
    },
  },

  "@keyframes fadeNewMessage": {
    "0%": {
      opacity: "0",
      transform: "translateY(1rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0px)",
    },
  },

  "@keyframes typingMessage": {
    "0%": {
      backgroundColor: "#606060",
    },
    "50%": {
      backgroundColor: "#fff",
    },
    "60%": {
      backgroundColor: "#606060",
    },
  },
}));

export default useStyles;

import React from "react";

const UserContext = React.createContext({
  user: Object,
  setUser: Function,
  userSessionId: String,
  setUserSessionId: Function,
});

export default UserContext;

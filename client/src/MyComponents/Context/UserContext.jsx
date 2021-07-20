import React from "react";

const UserContext = React.createContext({
  user: Object,
  setUser: Function,
  jwt: String,
  setJWT: Function,
  isLoggedIn: Boolean,
  setIsLoggedIn: Function,
});

export default UserContext;

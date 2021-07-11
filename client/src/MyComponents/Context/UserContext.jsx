import React from "react";

const UserContext = React.createContext({
  user: {},
  setUser: () => {},
  jwt: "",
  setJWT: () => {},
});

export default UserContext;

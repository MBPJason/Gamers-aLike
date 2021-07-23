import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import UserContext from "../Context/UserContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { userSessionId } = useContext(UserContext);
  const auth = Cookies.get("__AUTH");
  return (
    <Route
      {...rest}
      render={(props) =>
        userSessionId && auth ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "../Context/UserContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { userSessionId } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        userSessionId ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

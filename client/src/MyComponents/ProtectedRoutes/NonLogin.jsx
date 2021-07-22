import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "../Context/UserContext";

export default function NonLoggedInRoute({ component: Component, ...rest }) {
  const { userSessionId } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !userSessionId ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const auth = Cookies.get("__AUTH");
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
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

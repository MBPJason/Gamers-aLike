import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";


export default function NonLoggedInRoute({ component: Component, ...rest }) {
  const auth = Cookies.get("__AUTH");
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? (
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
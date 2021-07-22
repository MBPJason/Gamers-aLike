import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const signup = Cookies.get("signup");

export default function FinishSignUpRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        signup ? (
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

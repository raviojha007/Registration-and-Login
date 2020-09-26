import React from "react";
import { Route, Redirect } from "react-router-dom";

export const Protected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem("token");
      if (!token) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

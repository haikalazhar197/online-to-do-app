//Private route component to restrict access if user is not logged in
//Redirects to Login Page if not logged in
//Returns a Route component from react-router-dom

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  //To check if the user exist
  const { currentUser } = React.useContext(AuthContext);

  //Returns Route Components if user exist else redirect to /login
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

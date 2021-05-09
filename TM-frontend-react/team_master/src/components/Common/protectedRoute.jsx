import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  //set props.component as Component
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        //console.log(props);//see the default props behaviour

        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props); //If loged in, redirect to ...
      }}
    />
  );
};

export default ProtectedRoute;

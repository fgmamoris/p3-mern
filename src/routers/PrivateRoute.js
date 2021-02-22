import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({
  isAuthnticated,
  component: Component,
  ...rest
}) => {
  /* Le paseo el resto de la s propiedades a la ruta privada,
   * para luego pasarselas al Route, como el path, el exact y demas propiedades restantes
   * cuando son en las propiedades son el rest
   */
  {
    /*Le paso el parh, exact y demas, al protector de rutas*/
  }
  return (
    <Route
      {...rest}
      component={(props) =>
        //histoy, location, params o search
        isAuthnticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    ></Route>
  );
};
PrivateRoute.prototypes = {
  isAuthnticated: PropTypes.bool.isRequired,
  Component: PropTypes.func.isRequired,
};

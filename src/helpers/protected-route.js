import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function ProtectedRoute({ user, children }) {
    if (user) {
      return React.cloneElement(children, {user});
    }

    if (!user) {
    return <Navigate to={{ pathname: ROUTES.LOGIN }} />;
    }

    return null;
}

// let auth = { token: true };
  // return auth.token ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={{ pathname: ROUTES.LOGIN }} />
  // );


ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};

// { user, children, ...rest }
// <Route
//     {...rest}
//     render={({ location }) => {
//         if (user) {
//             return children;
//         }

//         if (!user) {
//             return (
//                 <Navigate
//                     to={{
//                         pathname: ROUTES.LOGIN,
//                         state: { from: location }
//                     }}
//                 />
//             );
//         }

//         return null;
//     }}
// />

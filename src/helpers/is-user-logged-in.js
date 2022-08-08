import React from "react";
import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function IsUserLoggedIn({ user, children}) {
  if (!user) {
    return children;
  }
  return <Navigate to={{ pathName: ROUTES.DASHBOARD }} replace />;
}

IsUserLoggedIn.propTypes = {
    user: PropTypes.object,
    redirectPath: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
  };
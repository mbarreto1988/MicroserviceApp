import { Navigate } from "react-router-dom";
import { isSessionValid } from "../../helpers/AuthSession";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  if (!isSessionValid()) {
    return <Navigate to="/login?auth=required" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

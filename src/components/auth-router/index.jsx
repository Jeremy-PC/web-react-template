import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default ({ auth, children }) => {
  const location = useLocation();

  if (auth) {
    // if里面做一些鉴权判断
    if (true) {
      return <>{children}</>;
    }
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <>{children}</>;
};

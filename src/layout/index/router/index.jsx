import React from "react";
// Router
import { HashRouter, Routes, Route } from "react-router-dom";
import routesMap from "./router.map.jsx";
// util && ramda
import { checkExist } from "@lib/util";
import { pick } from "ramda";
// auth
import AuthRouter from "@components/auth-router";

export default ({ scrollbarsRef }) => {
  // ------------------ methods --------------------------
  const getRoutesMap = (routesMap, parentPath) => {
    let arr = [];
    routesMap.forEach(({ auth = false, ...route }) => {
      const path = checkExist(parentPath)
        ? `${parentPath}${route.path}`
        : route.path;
      arr.push({ path, auth, ...pick(["title", "component"], route) });
      checkExist(route.children) &&
        (arr = [...arr, ...getRoutesMap(route.children, path)]);
    });
    return arr;
  };

  // --------------------- return --------------------------
  return (
    <HashRouter>
      <Routes>
        {getRoutesMap(routesMap).map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AuthRouter auth={route.auth}>
                <route.component
                  routeMap={pick(["title", "path"], route)}
                  scrollbarsRef={scrollbarsRef}
                />
              </AuthRouter>
            }
          />
        ))}
      </Routes>
    </HashRouter>
  );
};

import { __assign, __rest } from 'tslib';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE_ROLE_STORAGE } from '../../utils/constants.js';

var RoutingContext = /*#__PURE__*/createContext({});

function RoutingProvider(_a) {
  var _b;

  var browserRouterConfig = _a.browserRouterConfig,
      defaultPropRoutes = _a.routes,
      defaultRole = _a.defaultRole;

  var _c = useState(defaultPropRoutes !== null && defaultPropRoutes !== void 0 ? defaultPropRoutes : []),
      defaultRoutes = _c[0],
      setDefaultRoutes = _c[1];

  var _d = useState((_b = localStorage.getItem(ROUTE_ROLE_STORAGE)) !== null && _b !== void 0 ? _b : defaultRole),
      role = _d[0],
      setRole = _d[1];

  useEffect(function () {
    setDefaultRoutes(defaultPropRoutes);
  }, [defaultPropRoutes]);

  function handleSetRole(newRole) {
    setRole(newRole);
    localStorage.setItem(ROUTE_ROLE_STORAGE, newRole);
  }

  function renderRoutes(routes, parentKey) {
    var ifParentKey = parentKey ? "".concat(parentKey, "-") : '';

    if (routes && routes.length) {
      return routes.map(function (routeProps, key) {
        return renderRoute(__assign(__assign({}, routeProps), {
          key: "".concat(ifParentKey).concat(String(key).padStart(2, '0'))
        }));
      });
    }
  }

  function renderRoute(_a) {
    var children = _a.children,
        roles = _a.roles,
        key = _a.key,
        routeProps = __rest(_a, ["children", "roles", "key"]);

    if (role && roles && roles.length) {
      if (roles.includes(role)) {
        return /*#__PURE__*/React.createElement(Route, __assign({
          key: key
        }, routeProps));
      }

      return /*#__PURE__*/React.createElement(Route, __assign({}, routeProps, {
        element: /*#__PURE__*/React.createElement(Navigate, {
          to: '/403',
          replace: true
        }),
        key: key
      }));
    }

    return /*#__PURE__*/React.createElement(Route, __assign({}, routeProps, {
      key: key,
      children: renderRoutes(children, key)
    }));
  }

  return /*#__PURE__*/React.createElement(RoutingContext.Provider, {
    value: {
      role: role,
      setRole: handleSetRole
    }
  }, /*#__PURE__*/React.createElement(BrowserRouter, __assign({}, browserRouterConfig), /*#__PURE__*/React.createElement(Routes, null, renderRoutes(defaultRoutes))));
}

function useRouteRole() {
  var _a = useContext(RoutingContext),
      role = _a.role,
      setRole = _a.setRole;

  return [role, setRole];
}

export { RoutingProvider as default, useRouteRole };
//# sourceMappingURL=index.js.map

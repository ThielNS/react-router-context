'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRouterDom = require('react-router-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var ROUTE_ROLE_STORAGE = 'REACT_ROUTER_CONTEXT/route_role';

var RoutingContext = /*#__PURE__*/React.createContext({});

function RoutingProvider(_a) {
  var _b;

  var browserRouterConfig = _a.browserRouterConfig,
      defaultPropRoutes = _a.routes,
      defaultRole = _a.defaultRole;

  var _c = React.useState(defaultPropRoutes !== null && defaultPropRoutes !== void 0 ? defaultPropRoutes : []),
      defaultRoutes = _c[0],
      setDefaultRoutes = _c[1];

  var _d = React.useState((_b = localStorage.getItem(ROUTE_ROLE_STORAGE)) !== null && _b !== void 0 ? _b : defaultRole),
      role = _d[0],
      setRole = _d[1];

  React.useEffect(function () {
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
        return /*#__PURE__*/React__default["default"].createElement(reactRouterDom.Route, __assign({
          key: key
        }, routeProps));
      }

      return /*#__PURE__*/React__default["default"].createElement(reactRouterDom.Route, __assign({}, routeProps, {
        element: /*#__PURE__*/React__default["default"].createElement(reactRouterDom.Navigate, {
          to: '/403',
          replace: true
        }),
        key: key
      }));
    }

    return /*#__PURE__*/React__default["default"].createElement(reactRouterDom.Route, __assign({}, routeProps, {
      key: key,
      children: renderRoutes(children, key)
    }));
  }

  return /*#__PURE__*/React__default["default"].createElement(RoutingContext.Provider, {
    value: {
      role: role,
      setRole: handleSetRole
    }
  }, /*#__PURE__*/React__default["default"].createElement(reactRouterDom.BrowserRouter, __assign({}, browserRouterConfig), /*#__PURE__*/React__default["default"].createElement(reactRouterDom.Routes, null, renderRoutes(defaultRoutes))));
}

function useRouteRole() {
  var _a = React.useContext(RoutingContext),
      role = _a.role,
      setRole = _a.setRole;

  return [role, setRole];
}

exports.ReactRouterContext = RoutingProvider;
exports.useRouteRole = useRouteRole;
//# sourceMappingURL=index.js.map

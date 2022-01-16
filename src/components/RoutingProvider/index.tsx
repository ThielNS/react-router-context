import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoutingProviderProps, RoutingContextProps } from '../../types/Context';
import { RoutePaths, RouteProps } from '../../types/Routing';
import { ROUTE_ROLE_STORAGE } from '../../utils/constants';

const RoutingContext = createContext({} as RoutingContextProps);

function RoutingProvider<P = {}>({
  browserRouterConfig,
  routes: defaultPropRoutes,
  defaultRole,
}: RoutingProviderProps) {
  const [defaultRoutes, setDefaultRoutes] = useState<RouteProps<P>[]>(
    defaultPropRoutes ?? []
  );
  const [role, setRole] = useState<string | undefined>(
    localStorage.getItem(ROUTE_ROLE_STORAGE) ?? defaultRole
  );

  useEffect(() => {
    setDefaultRoutes(defaultPropRoutes);
  }, [defaultPropRoutes]);

  /**
   * handleSetRole
   * @param newRole Set new role
   */
  function handleSetRole(newRole: string) {
    setRole(newRole);
    localStorage.setItem(ROUTE_ROLE_STORAGE, newRole);
  }

  /**
   * renderRoutes
   * @param routes Array of the Route object
   * @returns JSX.Element | undefined
   */
  function renderRoutes(routes?: RouteProps<P>[], parentKey?: string) {
    const ifParentKey = parentKey ? `${parentKey}-` : '';

    if (routes && routes.length) {
      return routes.map((routeProps, key) =>
        renderRoute({
          ...routeProps,
          key: `${ifParentKey}${String(key).padStart(2, '0')}`,
        })
      );
    }
  }

  /**
   * renderRoute
   * @param route Prop of the Route object
   * @returns JSX.Element
   */
  function renderRoute({
    children,
    roles,
    key,
    ...routeProps
  }: RouteProps<P> & { key: string }) {
    if (role && roles && roles.length) {
      if (roles.includes(role)) {
        return <Route key={key} {...routeProps} />;
      }

      return (
        <Route
          {...routeProps}
          element={<Navigate to='/403' replace={true} />}
          key={key}
        />
      );
    }

    return (
      <Route {...routeProps} key={key} children={renderRoutes(children, key)} />
    );
  }

  return (
    <RoutingContext.Provider
      value={{ role, setRole: handleSetRole, routes: defaultRoutes }}
    >
      <BrowserRouter {...browserRouterConfig}>
        <Routes>{renderRoutes(defaultRoutes)}</Routes>
      </BrowserRouter>
    </RoutingContext.Provider>
  );
}

export function useRouteRole(): [string | undefined, (role: string) => void] {
  const { role, setRole } = useContext(RoutingContext);
  return [role, setRole];
}

export function useRoutes<P = any>(paths?: RoutePaths): RouteProps<P>[] {
  const { routes } = useContext(RoutingContext);

  function getRoute(paths: RoutePaths, pathRoutes = routes) {
    let obj = {} as RouteProps<P>;

    paths.forEach((path, i) => {
      const isIndex = typeof path === 'number';
      let r = pathRoutes;

      function forEach(route: RouteProps) {
        if (route.path === path) {
          if (i + 1 < paths.length) {
            obj = getRoute(paths.slice(i, paths.length), route.children);
          } else {
            obj = route;
          }
        }
      }

      if (isIndex) {
        if (i + 1 < paths.length) {
          obj = getRoute(paths.slice(i, paths.length), r[path].children);
        } else {
          obj = r[path];
        }
      } else {
        pathRoutes.forEach(forEach);
      }
    });

    return obj;
  }

  return !!paths ? [getRoute(paths)] : routes;
}

export default RoutingProvider;

import { RouteProps as RouteObj } from 'react-router-dom';

export type RouteProps<P = any> = RouteObj & {
  children?: RouteProps<P>[];
  roles?: string[];
  params?: P;
};

export type RoutesProps = { routes?: RouteProps[] };

export type RoutePaths = Array<string | number>;

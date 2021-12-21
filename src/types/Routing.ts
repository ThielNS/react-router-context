import { RouteProps as RouteObj } from 'react-router-dom';

export interface RouteProps<P = any> extends RouteObj {
  children?: RouteProps<P>[];
  roles?: string[];
  params?: P;
}

export type RoutesProps = { routes?: RouteProps[] };

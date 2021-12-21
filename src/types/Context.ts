import { BrowserRouterProps } from 'react-router-dom';
import { RouteProps } from './Routing';

export interface RoutingProviderProps {
  routes: RouteProps[];
  browserRouterConfig?: BrowserRouterProps;
  defaultRole?: string;
}

export interface RoutingContextProps {
  role?: string;
  setRole: (role: string) => void;
  routes: RouteProps[];
}

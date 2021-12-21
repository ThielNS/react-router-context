import { RoutingProviderProps } from '../../types/Context';
import { RouteProps } from '../../types/Routing';
declare function RoutingProvider({ browserRouterConfig, routes: defaultPropRoutes, defaultRole, }: RoutingProviderProps): JSX.Element;
export declare function useRouteRole(): [string | undefined, (role: string) => void];
export declare function useRoutes(): RouteProps[];
export default RoutingProvider;

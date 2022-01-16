import { RoutingProviderProps } from '../../types/Context';
import { RoutePaths, RouteProps } from '../../types/Routing';
declare function RoutingProvider<P = {}>({ browserRouterConfig, routes: defaultPropRoutes, defaultRole, }: RoutingProviderProps): JSX.Element;
export declare function useRouteRole(): [string | undefined, (role: string) => void];
export declare function useRoutes<P = any>(paths?: RoutePaths): RouteProps<P>[];
export default RoutingProvider;

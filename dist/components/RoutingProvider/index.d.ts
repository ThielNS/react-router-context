import { RoutingProviderProps } from '../../types/Context';
import { RoutePaths, RouteProps } from '../../types/Routing';
declare function RoutingProvider<P = {}>({ browserRouterConfig, routes: defaultPropRoutes, defaultRole, }: RoutingProviderProps<P>): JSX.Element;
export declare function useRouteRole(): [string | undefined, (role: string) => void];
export declare function useRoutes<P = any>(paths?: RoutePaths): Array<RouteProps<P> | undefined>;
export default RoutingProvider;

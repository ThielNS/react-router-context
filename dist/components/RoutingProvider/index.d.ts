import { RoutingProviderProps } from '../../types/Context';
declare function RoutingProvider({ browserRouterConfig, routes: defaultPropRoutes, defaultRole, }: RoutingProviderProps): JSX.Element;
export declare function useRouteRole(): [string | undefined, (role: string) => void];
export default RoutingProvider;

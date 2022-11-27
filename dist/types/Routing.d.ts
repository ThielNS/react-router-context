import { RouteProps as RouteObj } from 'react-router-dom';
export declare type RouteProps<P = any> = RouteObj & {
    children?: RouteProps<P>[];
    roles?: string[];
    params?: P;
};
export declare type RoutesProps = {
    routes?: RouteProps[];
};
export declare type RoutePaths = Array<string | number>;

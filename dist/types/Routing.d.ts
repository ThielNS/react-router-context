import { RouteProps as RouteObj } from 'react-router-dom';
export interface RouteProps extends RouteObj {
    children?: RouteProps[];
    roles?: string[];
}
export declare type RoutesProps = {
    routes?: RouteProps[];
};

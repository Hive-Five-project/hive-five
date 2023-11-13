import { Outlet, Route as ReactRoute } from 'react-router-dom';
import React, { Fragment } from 'react';
import { ltrimChar, rtrimChar, startWith } from '@app/utils/strings';

export type RouteDeclaration = {
  path: string
  relativePath: string
};

export type Page = React.FunctionComponent & RouteDeclaration;

export type Route = {
  guard?: React.FunctionComponent
  layout?: React.FunctionComponent
  component?: Page|React.FunctionComponent
  path?: string
  routes?: Array<Route>
}

/**
 * Declares a route on a page Component by adding its path and relative path properties.
 */
export function declareRoute(component: React.FunctionComponent, path: string, prefix: string|null = null): Page {
  // Just cast to Page to allow adding properties
  // @ts-ignore
  if (!((component): component is Page => true)(component)) {
    throw new Error('Cannot be reached');
  }

  component.path = rtrimChar(startWith(prefix ? prefix + '/' + ltrimChar(path, '/') : path, '/'), '/') || '/';
  component.relativePath = ltrimChar(path, '/');

  return component;
}

export function declareAdminRoute(Component: React.FunctionComponent, path: string): Page {
  return declareRoute(Component, path, 'admin');
}

export function declareUserRoute(Component: React.FunctionComponent, path: string): Page {
  return declareRoute(Component, path, 'user');
}

export function renderRoutes(routes: Array<Route> = []) {
  return routes.map((route, i) => {
    // Allow to provide a guard component, e.g: redirect to login on unauthenticated access to a private page
    const Guard = route.guard || Fragment;
    // Allows to provide a Layout component for the route
    const Layout = route.layout || Fragment;
    const Component = route.component || Outlet;

    return (
      <ReactRoute
        key={i}
        path={route.path ?? (Component as Page).relativePath}
        element={
          <Guard>
            <Layout>
              <Component />
            </Layout>
          </Guard>
        }
      >
        {/* Sub-routes */}
        {route.routes ? renderRoutes(route.routes) : null}
      </ReactRoute>
    );
  });
}

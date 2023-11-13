import { createSearchParams, generatePath, Params, URLSearchParamsInit } from 'react-router-dom';
import { Page } from '@app/router/router';

type QueryParameters = Record<string, string | string[] | null | undefined>

/**
 * Gets the path for a page, resolving its path parameters.
 */
export function path(
  path: string,
  parameters?: Params,
  queryParameters?: QueryParameters | URLSearchParams,
): string {
  if (!parameters) {
    return path;
  }

  if (queryParameters) {
    // Convert URLSearchParams to simple QueryParameters object
    if (queryParameters instanceof URLSearchParams) {
      queryParameters = Object.fromEntries(queryParameters.entries());
    }

    const queryParametersFiltered = Object.fromEntries(Object.entries(queryParameters).filter(
      ([, value]) => Boolean(value),
    )) as unknown;

    return generatePath(path, parameters) + '?' + createSearchParams(queryParametersFiltered as URLSearchParamsInit);
  }

  return generatePath(path, parameters);
}

/**
 * Resolves the path of {@link Page} and use it for links: <Link to={route(Home)} />…</Link>
 */
export function route(
  Component: Page,
  parameters?: Params,
  queryParameters?: QueryParameters | URLSearchParams,
) {
  return path(Component.path, parameters, queryParameters);
}

/**
 * Gets the absolute URL for a page or path.
 */
export function absoluteUrl(
  Component: Page | string,
  parameters?: Params,
  queryParameters?: QueryParameters,
): string {
  return window.location.origin + path(
    typeof Component === 'string' ? Component : Component.path,
    parameters,
    queryParameters,
  );
}

import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useErrorBoundaryContext } from '@app/components/ErrorBoundary';

/**
 * Wrap a React-router-dom Link to reset our application state before navigating.
 * This is required since our {@link ErrorBoundary} component might render an error page,
 * short-circuiting the normal routing process.
 */
export default function Link(props: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
  const { error, reset } = useErrorBoundaryContext();

  return <RouterLink {...props} onClick={error ? reset : undefined}/>;
}

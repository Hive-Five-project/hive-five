import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useErrorBoundaryContext } from '@app/components/ErrorBoundary';

/**
 * Wrap a React-router-dom Link to reset our application state before navigating.
 * This is required since our {@link ErrorBoundary} component might render an error page,
 * short-circuiting the normal routing process.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const { error, reset } = useErrorBoundaryContext();

  return <RouterLink ref={ref} {...props} onClick={error ? reset : undefined}/>;
});

export default Link;

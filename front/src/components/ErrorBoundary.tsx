import React, { createContext, useContext } from 'react';
import NotFound from '@app/pages/Error/NotFound';
import NotFoundError from '@app/errors/NotFoundError';
import FatalError from '@app/pages/Error/FatalError';
import ForbiddenError from '@app/errors/ForbiddenError';
import Forbidden from '@app/pages/Error/Forbidden';

interface ErrorBoundaryContext {
  error: Error | null
  setError: (error: Error | null) => void
  reset: () => void
}

const context = createContext<ErrorBoundaryContext>({
  error: null,
  setError: (error) => { console.error(error); },
  reset: () => {},
});

interface Props {
  children: React.ReactNode
}

interface State {
  error: Error | null
}

/**
 * Catch and handle global errors to display a nice error page.
 *
 * @see https://fr.reactjs.org/docs/error-boundaries.html
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  // @ts-ignore
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }
  // @ts-ignore
  static getDerivedStateFromError(error) {
    return { error };
  }
  // @ts-ignore
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] componentDidCatch', { error, info });
  }

  render() {
    const { error } = this.state;
    let children;

    switch (true) {

    case error instanceof NotFoundError:
      children = <NotFound />;
      break;

    case error instanceof ForbiddenError:
      children = <Forbidden />;
      break;

    case Boolean(error):
      // Unexpected error page
      children = <FatalError />;
      break;

    default:
      children = this.props.children;
    }

    return <context.Provider value={{
      error,
      setError: (error) => this.setState({ error }),
      reset: () => this.setState({ error: null }),
    }}>
      {children}
    </context.Provider>;
  }
}

export function useErrorBoundaryContext(): ErrorBoundaryContext {
  return useContext(context);
}

export function useNotFoundHandler() {
  const { setError } = useErrorBoundaryContext();

  // @ts-ignore
  return (message: string, error) => setError(new NotFoundError(message, error));
}

export function useForbiddenHandler() {
  const { setError } = useErrorBoundaryContext();

  return (message: string, error?: Error) => setError(new ForbiddenError(message, error));
}

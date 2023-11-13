import { PropsWithChildren, useEffect } from 'react';
import { useAuthContext } from '@app/hooks/useAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { route } from '@app/router/generator';
import Login from '@app/pages/Auth/Login';
import AppLayout from '@app/layouts/AppLayout';
import ForbiddenError from '@app/errors/ForbiddenError.ts';

interface Props {
  checkIsAdmin?: boolean
}

/**
 * Checks authentication and redirects to login page if not authenticated.
 */
export default function NeedsLogin({ children, checkIsAdmin = false }: PropsWithChildren<Props>) {
  const { pathname } = useLocation();
  const { authenticated, initialized, isAdmin } = useAuthContext();
  const navigate = useNavigate();

  // Wait for the authentication to be initialized,
  // then, if unauthenticated, redirect to the login page:
  useEffect(() => {
    if (!initialized) {
      // Noop on non-initialized authentication
      return;
    }

    if (!authenticated) {
      // Redirect to the login page if not authenticated
      navigate(route(Login), {
        state: {
          target: pathname,
        },
      });
    }

    if (checkIsAdmin && !isAdmin) {
      throw new ForbiddenError();
    }
  }, [isAdmin, checkIsAdmin, authenticated, initialized, navigate, pathname]);

  if (!authenticated) {
    return <AppLayout>
      <main role="main">
        <p>
          Vérification de votre authentification…
        </p>
      </main>
    </AppLayout>;
  }

  return <>{children}</>;
}

import { useCallback, useEffect, useState } from 'react';
import { declareRoute } from '@app/router/router';
import { CachePolicies, useFetch } from 'use-http';
import { useNavigate } from 'react-router-dom';
import { route } from '@app/router/generator';
import { useAuthContext } from '@app/hooks/useAuthContext';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { trans } from '@app/translations';
import Login from '@app/pages/Auth/Login';
import { LOGOUT_PATH } from '@app/paths';

const LOGOUT_REDIRECT_DELAY = 1000;

function useLogout() {
  const navigate = useNavigate();
  const { postLogout } = useAuthContext();
  const { loading, error, post, response } = useFetch('/api/logout', {
    cachePolicy: CachePolicies.NETWORK_ONLY,
  });
  const [erroneousResponse, setAsErroneousResponse] = useState<boolean>(false);

  const logout = useCallback(async function () {
    setAsErroneousResponse(false);
    await post();

    if (typeof(response.ok) === 'undefined') {
      // not yet available
      return;
    }

    if (!response.ok) {
      setAsErroneousResponse(true);
      return;
    }

    await postLogout();

    // Redirect to home after a delay
    setTimeout(() => {
      navigate(route(Login));
    }, LOGOUT_REDIRECT_DELAY);
  }, [navigate, post, postLogout, response.ok]);

  return {
    logout,
    loading,
    error: error || erroneousResponse,
  };
}

/**
 * Logout page.
 * Redirecting to the main listing.
 */
const Logout = declareRoute(function Page() {

  useDocumentTitle(trans('pages.logout.documentTitle'));

  const { logout, loading, error } = useLogout();

  useEffect(() => {
    logout();
  } , [logout]);

  if (loading) {
    return <div>Chargement en cours</div>;
  }

  if (error) {
    return <div>Une erreur innatendue est survenue</div>;
  }

  return <div>{'Vous êtes déconnecté. Redirection vers la page d\'accueil…'}</div>;
}, LOGOUT_PATH);

export default Logout;

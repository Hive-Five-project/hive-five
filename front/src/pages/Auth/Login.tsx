import { FormEvent, useCallback, useEffect, useState } from 'react';
import { declareRoute } from '@app/router/router';
import { CachePolicies, useFetch } from 'use-http';
import { useLocation, useNavigate } from 'react-router-dom';
import Link from '@app/components/Router/Link';
import useBool from '@app/hooks/useBool';
import { useAuthContext } from '@app/hooks/useAuthContext';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { trans } from '@app/translations';
import { route } from '@app/router/generator';
import ForgotPassword from '@app/pages/Auth/ForgotPassword';
import Admin from '@app/pages/Admin/Admin';
import User from '@app/pages/User/User';
import { Button, TextField } from '@mui/material';

interface LoginRedirectState {
  target?: string | null
}

function useLogin() {
  const { postLogin, profile } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { loading, error, post, response, data } = useFetch('/login', {
    cachePolicy: CachePolicies.NETWORK_ONLY,
  });
  const [erroneousResponse, , setAsErroneousResponse, resetErroneousResponse] = useBool(false);

  const login = useCallback(async (username: string, password: string) => {
    // Clear any previous error:
    resetErroneousResponse();

    await post({ username, password });

    if (!response.ok) {
      return setAsErroneousResponse();
    }

    postLogin();
  }, [post, postLogin, resetErroneousResponse, response, setAsErroneousResponse]);

  // Redirect on authenticated user with its profile:
  useEffect(() => {
    if (profile !== null) {
      // Redirect to home (or previous route before login redirect if any)
      navigate((state as LoginRedirectState)?.target ?? route(profile.isAdmin ? Admin : User));
    }
  }, [navigate, profile, state]);

  const hasError = Boolean(error || erroneousResponse);

  return {
    login,
    loading,
    error: hasError,
    authenticationErrorMessage: hasError ? (data?.message ?? 'L\'authentification a échouée.') : null,
  };
}

/**
 * Login page for the users.
 */
const Login = declareRoute(function Page() {
  useDocumentTitle(trans('pages.login.documentTitle'));

  const { login, loading, error, authenticationErrorMessage } = useLogin();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username && password) {
      void login(username, password)
    }
  }

  return <div>
    <form id="login" onSubmit={onSubmit}>
      <h2>{trans('pages.login.documentTitle')}</h2>

      <TextField
        id="username"
        label="Identifiant"
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        InputProps={{
          autoFocus: true,
          autoComplete: 'username',
          placeholder: 'Votre email',
        }}
        error={error}
      />

      <TextField
        id="password"
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
        InputProps={{
          autoComplete: 'current-password',
        }}
        error={Boolean(authenticationErrorMessage)}
      />

      <div>
        <a href={'/'}>
          {'Retour à l\'accueil'}
        </a>

        <Button
          color="primary"
          type="submit"
          disabled={loading}
        >
          Se connecter
        </Button>
      </div>
    </form>

    <hr />

    <div>
      <Link to={route(ForgotPassword)}>Mot de passe oublié ?</Link>
    </div>
  </div>;
}, '/login');

export default Login;

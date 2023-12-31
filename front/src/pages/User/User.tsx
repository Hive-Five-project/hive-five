import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { declareUserRoute } from '@app/router/router';
import { useAuthContext } from '@app/hooks/useAuthContext';
import Link from '@app/components/Router/Link';
import { route } from '@app/router/generator';
import Logout from '@app/pages/Auth/Logout';
import Login from '@app/pages/Auth/Login';

export default declareUserRoute(function Admin() {
  useDocumentTitle('User');

  const { profile, authenticated } = useAuthContext();

  return <div>
    <h1>User</h1>

    {profile &&
      <p>Welcome, {profile.email}!</p>
    }
    {authenticated
      ? <Link to={route(Logout)}>Logout</Link>
      : <Link to={route(Login)}>Login</Link>
    }

  </div>;
}, '/');

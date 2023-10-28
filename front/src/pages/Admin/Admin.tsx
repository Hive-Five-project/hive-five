import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { declareAdminRoute } from '@app/router/router';
import { useAuthContext } from '@app/hooks/useAuthContext';
import Link from '@app/components/Router/Link';
import { route } from '@app/router/generator';
import Logout from '@app/pages/Auth/Logout';
import Login from '@app/pages/Auth/Login';
import ListUsers from '@app/pages/Admin/User/ListUsers/ListUsers.tsx';

export default declareAdminRoute(function Admin() {
  useDocumentTitle('Admin');

  const { profile, authenticated } = useAuthContext();

  return <div>
    <h1>Admin</h1>

    {profile &&
      <p>Welcome, {profile.email}!</p>
    }
    <div>
      {profile?.isAdmin && <Link to={route(ListUsers)}>List users</Link>}
    </div>
    {authenticated
      ? <Link to={route(Logout)}>Logout</Link>
      : <Link to={route(Login)}>Login</Link>
    }
  </div>;
}, '/');

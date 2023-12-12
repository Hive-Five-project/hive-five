import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { declareAdminRoute } from '@app/router/router';
import { useQuery } from '@apollo/client';
import ListUsersQuery from '@graphql/query/user/ListUsers.graphql';
import { ROUTE_LIST_USERS } from '@app/paths';
import { trans } from '@app/translations';
import { useForbiddenHandler } from '@app/components/ErrorBoundary.tsx';

export interface User {
  uid: string
  email: string
  firstname: string
  lastname: string
  isAdmin: boolean
  createdAt: string
}

interface ListUsersResponse {
  User: {
    list: User[]
  }
}

const Page = declareAdminRoute(function ListUsers() {
  useDocumentTitle('Users lists');
  const forbiddenErrorHandler = useForbiddenHandler()

  const { data, loading, error } = useQuery<ListUsersResponse>(
    ListUsersQuery,
    {
      context: {
        onForbidden: forbiddenErrorHandler,
      },
    });

  if (loading) {
    // TODO: better loading state, with a dedicated skeleton or generic loader?
    return <>
      <p>{trans('common.loading')}</p>
    </>;
  }

  if (error) {
    // Rethrow to let the error boundary handle it and show a generic error page
    throw error;
  }

  const users = data!.User.list;

  return <>
    <h1>Liste des utilisateurs, admin</h1>
    {users.map(user => {
      return <p key={user.uid}>{user.email}</p>;
    })}
  </>;
}, ROUTE_LIST_USERS);

export default Page;


import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { declareAdminRoute } from '@app/router/router';
import { useQuery } from '@apollo/client';
import ListUsersQuery from '@graphql/query/user/ListUsers.graphql';
import { ROUTE_LIST_USERS } from '@app/paths';
import { trans } from '@app/translations';
import { useForbiddenHandler } from '@app/components/ErrorBoundary.tsx';
import { useLocation } from 'react-router-dom';
import { usePageNumberFromQuery } from '@app/hooks/usePageNumber.ts';
import { Box, Button, Group, Title } from '@mantine/core';
import UsersTable from '@app/pages/Admin/User/ListUsers/UsersTable.tsx';
import Link from '@app/components/Router/Link.tsx';
import UserCreate from '@app/pages/Admin/User/Forms/UserCreate.tsx';
import { route } from '@app/router/generator.ts';

export interface User {
  uid: string
  email: string
  firstname: string
  lastname: string
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

interface ListUsersResponse {
  User: {
    list: User[]
  }
}

const Page = declareAdminRoute(function ListUsers() {
  useDocumentTitle('Users lists');
  const location = useLocation();
  const currentPage = usePageNumberFromQuery();

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
  const previousUrl = location.pathname + location.search;

  return <Box p="md">
    <Group>
      <Title order={1}>Users list</Title>
      <Button>
        <Link style={{
          color: 'white',
        }} to={route(UserCreate)}>Create a new user</Link>
      </Button>
      <UsersTable previousUrl={previousUrl} users={users} currentPage={currentPage} />
    </Group>
  </Box>
}, ROUTE_LIST_USERS);

export default Page;

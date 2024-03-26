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
import Alert from '@app/pages/Error/Alert.tsx';
import { useMutation } from '@app/api/apollo/useMutation.ts';
import DeleteUserMutation from '@graphql/mutation/user/DeleteUser.graphql';
import { onDeleteUser } from '@graphql/store/users.ts';
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes.ts';
import { onMutateError } from '@graphql/utils.ts';
import { useMemo, useState } from 'react';

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

interface MutationDeleteResponse {
  User: {
    delete: string
  }
}

const Page = declareAdminRoute(function ListUsers() {
  useDocumentTitle('Users lists');
  const location = useLocation();
  const currentPage = usePageNumberFromQuery();
  const [uidDeleted, setUidDeleted] = useState<string | null>(null);
  const [mutate, mutationState] = useMutation<MutationDeleteResponse>(DeleteUserMutation, {
    update(cache, { data }) {
      onDeleteUser(cache, data!.User.delete);
    },
  });

  const mappedErrors = useMemo(() => {
    const error = mutationState.error;
    return {
      __root: error ? 'Une erreur est survenue lors de la soumission du formulaire.' : undefined,
      ...(error ? errorsByPath(error.graphQLErrors as AppGraphQLError[]) : {}),
    };
  }, [mutationState.error]);

  async function submitDeletion(uid: string) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setUidDeleted(null);

    mutate({
      variables: { uid: uid },
    }).then((response) => {
      setUidDeleted(response.data!.User.delete);
    }).catch(onMutateError);
  }

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
  // todo: hard delete on second user deletion with a red warning.

  return <Box p="md">
    {uidDeleted && <Alert title="Success" variant="success">User {uidDeleted} correctly deleted.</Alert>}
    {mappedErrors.__root && <Alert title="Error" variant="danger">{mappedErrors.__root}</Alert>}
    <Group>
      <Title order={1}>Users list</Title>
      <Button>
        <Link
          style={{
            color: 'white',
          }} to={route(UserCreate)}
        >Create a new user</Link>
      </Button>
      <UsersTable
        previousUrl={previousUrl}
        users={users}
        currentPage={currentPage}
        submitDeletion={submitDeletion}
      />
    </Group>
  </Box>
}, ROUTE_LIST_USERS);

export default Page;

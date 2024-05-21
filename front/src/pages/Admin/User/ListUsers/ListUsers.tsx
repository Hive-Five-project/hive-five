import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { declareAdminRoute } from '@app/router/router';
import { useQuery } from '@apollo/client';
import ListUsersQuery from '@graphql/query/user/ListUsers.graphql';
import { USER_LIST_PATH } from '@app/paths';
import { trans } from '@app/translations';
import { useForbiddenHandler } from '@app/components/ErrorBoundary.tsx';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { usePageNumberFromQuery } from '@app/hooks/usePageNumber.ts';
import { Box, Button, Group, Title } from '@mantine/core';
import UsersTable from '@app/components/User/UsersTable.tsx';
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
import { useDisclosure } from '@mantine/hooks';
import UsersFilters, { Filters, filterUsers } from '@app/components/User/UsersFilters.tsx';

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
  useDocumentTitle(trans('pages.admin.user.list.documentTitle'));
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = usePageNumberFromQuery();
  const [page, setPage] = useState(currentPage);
  const [uidDeleted, setUidDeleted] = useState<string | null>(null);
  const [openedFilterDrawer, { open, close }] = useDisclosure(false);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(unserializeFilters(searchParams));

  const [mutate, mutationState] = useMutation<MutationDeleteResponse>(DeleteUserMutation, {
    update(cache, { data }) {
      onDeleteUser(cache, data!.User.delete);
    },
  });

  const mappedErrors = useMemo(() => {
    const error = mutationState.error;
    return {
      __root: error ? trans('pages.notFound.fatalError.form') : undefined,
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

  function isKeyOfFilters(key: string): key is keyof Filters {
    return ['emails', 'firstnames', 'lastnames', 'isAdmin'].includes(key);
  }

  function unserializeFilters(searchParams: URLSearchParams): Filters {
    const filters: Filters = {
      emails: null,
      firstnames: null,
      lastnames: null,
      isAdmin: null,
      isUser: null,
      createdAtStart: null,
      createdAtEnd: null,
      updatedAtStart: null,
      updatedAtEnd: null,
      deletedAtStart: null,
      deletedAtEnd: null,
    };

    for (const [key, value] of searchParams.entries()) {
      if (isKeyOfFilters(key)) {
        if(key === 'isAdmin' || key === 'isUser') {
          filters[key] = value === 'true';
          continue;
        }
        if (key === 'createdAtStart'
          || key === 'createdAtEnd'
          || key === 'updatedAtStart'
          || key === 'updatedAtEnd'
          || key === 'deletedAtStart'
          || key === 'deletedAtEnd') {
          filters[key] = new Date(value);
          continue;
        }
        filters[key] = value.split(',');
      }
    }
    return filters;
  }

  function onSubmitFilters(filters: Filters) {
    setFilters(filters);
    const serializedFilters = Object.fromEntries(Object.entries(filters).map(([key, filter]) => {
      if (typeof filter === 'boolean'){
        return [key, filter ? 'true' : 'false'];
      }
      if (filter instanceof Date) {
        return [key, filter.toISOString()];
      }
      return [key, filter];
    }).filter(([, filter]) => filter !== null));
    setPage(1);
    close();
    navigate(route(Page, {}, serializedFilters));
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
  const filteredUsers = filterUsers(users, filters);
  const previousUrl = location.pathname + location.search;
  // todo: hard delete on second user deletion with a red warning.

  return <Box p="md">
    {uidDeleted && <Alert title="Success" variant="success"> {uidDeleted} : {trans('pages.admin.user.form.successDelete')}</Alert>}
    {mappedErrors.__root && <Alert title="Error" variant="danger">{mappedErrors.__root}</Alert>}
    <Group>
      <Title order={1}>{trans('pages.admin.user.list.documentTitle')}</Title>
      <Button
        component={Link}
        to={route(UserCreate)}>
        {trans('pages.admin.user.create.button')}
      </Button>
      <Button onClick={open}>Open Filters</Button>

      <UsersTable
        previousUrl={previousUrl}
        users={filteredUsers}
        page={page}
        setPage={setPage}
        currentPage={currentPage}
        submitDeletion={submitDeletion}
      />
    </Group>
    <UsersFilters users={filteredUsers} onSubmit={onSubmitFilters} onClose={close} open={open} opened={openedFilterDrawer} />
  </Box>
}, USER_LIST_PATH);

export default Page;

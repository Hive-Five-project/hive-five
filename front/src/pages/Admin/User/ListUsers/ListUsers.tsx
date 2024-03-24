import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { declareAdminRoute } from '@app/router/router';
import { useQuery } from '@apollo/client';
import ListUsersQuery from '@graphql/query/user/ListUsers.graphql';
import { ROUTE_LIST_USERS } from '@app/paths';
import { trans } from '@app/translations';
import { useForbiddenHandler } from '@app/components/ErrorBoundary.tsx';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { usePageNumberFromQuery } from '@app/hooks/usePageNumber.ts';
import { route } from '@app/router/generator.ts';
import { Box, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from '@app/components/Router/Link.tsx';
import UserCreate from '@app/pages/Admin/User/Forms/UserCreate.tsx';
import UsersTable from '@app/pages/Admin/User/ListUsers/UsersTable.tsx';

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
  //const [opened, { toggle }] = useDisclosure(false);
  //const navigate = useNavigate();
  const location = useLocation();
  //const [searchParams] = useSearchParams();
  const currentPage = usePageNumberFromQuery();
  //const [filters, setFilters] = useState<Filters>(unserializeFilters(searchParams));


  const forbiddenErrorHandler = useForbiddenHandler()

  const { data, loading, error } = useQuery<ListUsersResponse>(
    ListUsersQuery,
    {
      context: {
        onForbidden: forbiddenErrorHandler,
      },
    });

  /*function unserializeFilters(searchParams: URLSearchParams): Filters {
    const filters: Filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (['isAdmin'].includes(key)) {
        // @ts-ignore
        filters[key] = value === 'true';
        continue;
      }
      if (['createdAt', 'updatedAt', 'deletedAt'].includes(key)) {
        // @ts-ignore
        filters[key] = new Date(value);
        continue;
      }
      // @ts-ignore
      filters[key] = value;
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

    // Reset to first page:
    navigate(route(Page, { page: '1' }, serializedFilters));
  }*/

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
  console.log(users);
  //const filteredUsers = sortUsers(filterUsers(users, filters));
  const previousUrl = location.pathname + location.search;

  return <Box p="md">

    {/*<Group justify="center" mb={5}>
      <Button variant="primary" component={Link} to={route(UserCreate)}>CreateUser</Button>
      <Button onClick={toggle}>Filtrer</Button>
    </Group>

    <Collapse in={opened}>
      <UsersFilters initialFilters={filters} users={filteredUsers} onSubmit={onSubmitFilters} />
    </Collapse>*/}

    <UsersTable previousUrl={previousUrl} users={users} currentPage={currentPage} />
  </Box>
}, ROUTE_LIST_USERS);

export default Page;

/**
 * Sort users by email, alphabetically.
 */
/*function sortUsers(users: User[]) {
  return users.sort((a, b) => a.email.localeCompare(b.email));
}*/



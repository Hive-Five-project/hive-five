import Link from '@app/components/Router/Link';
import { WithPreviousUrl } from '@app/hooks/usePreviousUrlLocationState';
import { useCallback, useMemo, useState } from 'react';
import { Button, Menu } from '@mantine/core';
import { UserForAdmin as User } from '@app/models/types/User';
import { useSortHook } from '@app/hooks/useSortHook.tsx';
import { compareDates, compareStrings } from '@app/utils/sort.ts';
import Table from '@app/components/UI/Form/Table.tsx';
import { Pagination as PaginationMantine } from '@mantine/core';


interface Props {
  users: readonly User[]
  currentPage: number
  perPage?: number
}

export default function UsersTable({
  users,
  currentPage,
  perPage = 10,
  previousUrl,
}: WithPreviousUrl<Props>) {
  const { sortColumn, sortOrder, handleSort } = useSortHook();
  const [page, setPage] = useState(currentPage);

  const sortSettings = {
    'email': true,
    'firstname': true,
    'lastname': true,
    'createdAt': true,
    'updatedAt': true,
    'deletedAt': true,
  };

  const getSortedUsers = useCallback(() => {
    return [...users].sort((a, b) => {
      switch (sortColumn) {
        case 'email':
          return compareStrings(a.email, b.email, sortOrder);
        case 'firstname':
          return compareStrings(a.firstname, b.firstname, sortOrder);
        case 'lastname':
          return compareStrings(a.lastname, b.lastname, sortOrder);
        case 'createdAt':
          return compareDates(a.createdAt, b.createdAt, sortOrder);
        case 'updatedAt':
          if (a.updatedAt !== null && b.updatedAt !== null) {
            return compareDates(a.updatedAt, b.updatedAt, sortOrder);
          }
          return 0;
        case 'deletedAt':
          if (a.deletedAt !== null && b.deletedAt !== null) {
            return compareDates(a.deletedAt, b.deletedAt, sortOrder);
          }
          return 0;
        default:
          return 0;
      }
    });
  }, [sortColumn, sortOrder, users]);

  const sortedUsers = useMemo(() => getSortedUsers(), [getSortedUsers]);

  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const pages = chunk(
    Array(sortedUsers.length)
      .fill(0)
      .map((_, index) => ({
        ...sortedUsers[index],
      })),
    perPage,
  );

  const pageUsers = pages[page - 1].map((user) => (
    <TableItem
      previousUrl={previousUrl}
      key={user.uid}
      user={user}
    />
  ));

  return <>
    <Table
      headers={[
        'email',
        'firstname',
        'lastname',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'isAdmin',
        '',
      ]}
      onHeaderClick={handleSort}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      sortSettings={sortSettings}
      rows={pageUsers}
    />
    <PaginationMantine total={pages.length} value={page} onChange={setPage}
    />
  </>;
}

function TableItem({ user, previousUrl }: WithPreviousUrl<{
  user: User
}>) {
  return <tr>
    <td>{user.email}</td>
    <td>{user.firstname}</td>
    <td>{user.lastname}</td>
    <td>{new Date(user.createdAt).getDate()}</td>
    <td>{user.updatedAt ? new Date(user.updatedAt).getDate() : ''}</td>
    <td>{user.deletedAt ? new Date(user.deletedAt).getDate() : ''}</td>
    <td>{user.isAdmin ? 'admin' : 'user'}</td>
    <td className="text-right">
      <TableItemMenu uid={user.uid} previousUrl={previousUrl} />
    </td>
  </tr>;
}

function TableItemMenu({ uid, previousUrl }: WithPreviousUrl<{ uid: string }>) {
  const [openedAction, setOpenedAction] = useState(false);

  return (
    <Menu shadow="md" width={200} opened={openedAction} onChange={setOpenedAction}>
      <Menu.Target>
        <Button
          component="div"
          variant="link"
          size="xs"
          color="blue"
        >
          Actions
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          {/*<LinkToRedirect to={route(UserUpdate, { uid } )} state={{ previousUrl }}>
            Modifier
          </LinkToRedirect>*/}
        </Menu.Item>
        <Menu.Item>
          <Link to="/">Supprimer</Link>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}


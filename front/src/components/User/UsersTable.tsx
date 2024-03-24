import Link from '@app/components/Router/Link.tsx';
import { WithPreviousUrl } from '@app/hooks/usePreviousUrlLocationState.tsx';
import { useCallback, useMemo, useState } from 'react';
import { Button, Menu, Pagination as PaginationMantine, Table } from '@mantine/core';
import { UserForAdmin as User } from '@app/models/types/User.ts';
import { useSortHook } from '@app/hooks/useSortHook.tsx';
import { compareDates, compareStrings } from '@app/utils/sort.ts';
import TableWithFilter from '@app/components/UI/Table/TableWithFilter.tsx';
import { route } from '@app/router/generator.ts';
import UserUpdate from '@app/pages/Admin/User/Forms/UserUpdate.tsx';
import DeleteModal from '@app/components/UI/Form/DeleteModal.tsx';
import { useDisclosure } from '@mantine/hooks';
import { trans } from '@app/translations';

interface Props {
  users: readonly User[]
  page: number
  setPage: (page: number) => void
  currentPage: number
  perPage?: number
  submitDeletion: (uid: string) => Promise<void>
}

export default function UsersTable({
  users,
  page,
  setPage,
  perPage = 10,
  previousUrl,
  submitDeletion,
}: WithPreviousUrl<Props>) {
  const { sortColumn, sortOrder, handleSort } = useSortHook();

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
        if(a.deletedAt !== b.deletedAt) {
          return a.deletedAt? -1 : 1;
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

  const rows = pages[page - 1].map((user) => (
    <TableUserRow
      previousUrl={previousUrl}
      key={user.uid}
      user={user}
      submitDeletion={submitDeletion}
    />
  ));

  return <>
    <TableWithFilter
      headers={[
        'uid',
        'email',
        'firstname',
        'lastname',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'isAdmin',
        'actions',
      ]}
      onHeaderClick={handleSort}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      sortSettings={sortSettings}
      rows={rows}
    />
    <PaginationMantine
      total={pages.length} value={page} onChange={setPage}
    />
  </>;
}

function TableUserRow({
  user,
  previousUrl,
  submitDeletion,
}: WithPreviousUrl<{
  user: User
  submitDeletion: (uid: string) => Promise<void>
}>) {
  return <Table.Tr>
    <Table.Td>{user.uid}</Table.Td>
    <Table.Td>{user.email}</Table.Td>
    <Table.Td>{user.firstname}</Table.Td>
    <Table.Td>{user.lastname}</Table.Td>
    <Table.Td>{new Date(user.createdAt).toLocaleDateString()}</Table.Td>
    <Table.Td>{user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : ''}</Table.Td>
    <Table.Td>{user.deletedAt ? new Date(user.deletedAt).toLocaleDateString() : ''}</Table.Td>
    <Table.Td>{user.isAdmin ? 'admin' : 'user'}</Table.Td>
    <Table.Td className="text-right">
      <TableItemMenu
        user={user}
        previousUrl={previousUrl}
        submitDeletion={submitDeletion}
      />
    </Table.Td>
  </Table.Tr>;
}

function TableItemMenu({
  user,
  previousUrl,
  submitDeletion,
}: WithPreviousUrl<{
  user: User
  submitDeletion: (uid: string) => Promise<void>
}>) {
  const [openedAction, setOpenedAction] = useState(false);
  const [openedDeleteModale, { open, close }] = useDisclosure(false);

  return (
    <>
      <Menu shadow="md" width={200} opened={openedAction} onChange={setOpenedAction}>
        <Menu.Target>
          <Button
            component="div"
            variant="link"
            size="xs"
            color="blue"
          >
            {trans('pages.admin.user.list.table.action.button')}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            component={Link}
            to={route(UserUpdate, { id: user.uid })}
            state={{ previousUrl }}
          >
            {trans('pages.admin.user.list.table.action.update')}
          </Menu.Item>
          {null === user.deletedAt && <Menu.Item
            onClick={() => {
              open();
            }}
          >
            {trans('pages.admin.user.list.table.action.delete')}
          </Menu.Item>}
        </Menu.Dropdown>
      </Menu>
      <DeleteModal
        opened={openedDeleteModale} close={close} user={user} onSubmit={() => {
          submitDeletion(user.uid).then(() => {
            close();
          },
          );
        }}
      />
    </>
  );
}


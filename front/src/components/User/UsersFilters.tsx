import { useEffect, useState } from 'react';
import { User } from '@app/pages/Admin/User/ListUsers/ListUsers.tsx';
import { Button, Drawer, Flex, Group, Space, Switch } from '@mantine/core';
import SearchableSelect from '@app/components/UI/Form/SearchableSelect.tsx';
import { DatePickerInput } from '@mantine/dates';

export interface Filters {
  emails: string[] | null
  firstnames: string[] | null
  lastnames: string[] | null
  isAdmin: boolean | null
  isUser: boolean | null
  createdAtStart: Date | null
  createdAtEnd: Date | null
  updatedAtStart: Date | null
  updatedAtEnd: Date | null
  deletedAtStart: Date | null
  deletedAtEnd: Date | null
}

interface Props {
  users: readonly User[]
  onSubmit: (filters: Filters) => void
  initialFilters?: Filters
  opened: boolean
  open: () => void
  onClose: () => void
}

export default function UsersFilters({
  users,
  onSubmit,
  initialFilters,
  opened,
  open,
  onClose,
}: Props) {
  const [emails, setEmails] = useState<string[] | null>(initialFilters?.emails ?? null);
  const [firstnames, setFirstnames] = useState<string[] | null>(initialFilters?.firstnames ?? null);
  const [lastnames, setLastnames] = useState<string[] | null>(initialFilters?.lastnames ?? null);
  const [isAdmin, setIsAdmin] = useState<boolean>(initialFilters?.isAdmin ?? false);
  const [isUser, setIsUser] = useState<boolean>(initialFilters?.isAdmin ?? false);
  const [createdAtStart, setCreatedAtStart] = useState<Date | null>(initialFilters?.createdAtStart ?? null);
  const [createdAtEnd, setCreateAtEnd] = useState<Date | null>(initialFilters?.createdAtEnd ?? null);
  const [updatedAtStart, setUpdatedAtStart] = useState<Date | null>(initialFilters?.updatedAtStart ?? null);
  const [updatedAtEnd, setUpdatedAtEnd] = useState<Date | null>(initialFilters?.updatedAtEnd ?? null);
  const [deletedAtStart, setDeletedAtStart] = useState<Date | null>(initialFilters?.deletedAtStart ?? null);
  const [deletedAtEnd, setDeletedAtEnd] = useState<Date | null>(initialFilters?.deletedAtEnd ?? null);

  useEffect(() => {
    if (isAdmin) {
      setIsUser(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isUser) {
      setIsAdmin(false);
    }
  }, [isUser]);

  function clear(e: { currentTarget: { blur: () => void } }) {
    setEmails(null);
    setFirstnames(null);
    setLastnames(null);
    setIsAdmin(false);
    setIsUser(false);
    setCreatedAtStart(null);
    setCreateAtEnd(null);
    setUpdatedAtStart(null);
    setUpdatedAtEnd(null);
    setDeletedAtStart(null);
    setDeletedAtEnd(null);

    onSubmit({
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
    });
    e.currentTarget.blur();
  }

  function submit(e: { preventDefault: () => void, currentTarget: { blur: () => void } }) {
    e.preventDefault();
    e.currentTarget.blur();
    onSubmit({
      emails,
      firstnames,
      lastnames,
      isAdmin,
      isUser,
      createdAtStart,
      createdAtEnd,
      updatedAtStart,
      updatedAtEnd,
      deletedAtStart,
      deletedAtEnd,
    });
  }

  const firstnameList = users.map(user => user.firstname).filter((value, index, self) => self.indexOf(value) === index);
  const lastnameList = users.map(user => user.lastname).filter((value, index, self) => self.indexOf(value) === index);
  const emailList = users.map(user => user.email);

  return <Drawer opened={opened} onClose={onClose}>
    <form onSubmit={submit}>
      <Space h={8} />
      <Flex gap="xl" direction="column">
        <SearchableSelect data={emailList} value={emails} setValue={setEmails} label="Email" />
        <SearchableSelect data={firstnameList} value={firstnames} setValue={setFirstnames} label="Prénom" />
        <SearchableSelect data={lastnameList} value={lastnames} setValue={setLastnames} label="Nom" />
        <Group>
          <DatePickerInput
            label="Created at start"
            placeholder="Created at start"
            value={createdAtStart}
            onChange={setCreatedAtStart}
          />
          <DatePickerInput
            label="Created at end"
            placeholder="Created at end"
            value={createdAtEnd}
            onChange={setCreateAtEnd}
          />
        </Group>
        <Group>
          <DatePickerInput
            label="Updated at start"
            placeholder="Updated at start"
            value={updatedAtStart}
            onChange={setUpdatedAtStart}
          />
          <DatePickerInput
            label="Updated at end"
            placeholder="Updated at end"
            value={updatedAtEnd}
            onChange={setUpdatedAtEnd}
          />
        </Group>
        <Group>
          <DatePickerInput
            label="Deleted at start"
            placeholder="Deleted at start"
            value={deletedAtStart}
            onChange={setDeletedAtStart}
          />
          <DatePickerInput
            label="Deleted at end"
            placeholder="Deleted at end"
            value={deletedAtEnd}
            onChange={setDeletedAtEnd}
          />
        </Group>
        <Group>
          <Switch
            label={'Is admin'}
            checked={isAdmin}
            onChange={(event) => setIsAdmin(event.currentTarget.checked)}
          />
          <Switch
            label={'Is user'}
            checked={isUser}
            onChange={(event) => setIsUser(event.currentTarget.checked)}
          />
        </Group>
      </Flex>
      <Space h={8} />
      <Group>
        <Button
          onClick={(e) => {
            clear(e);
            open();
          }}
        >
          Clear filters
        </Button>
        <Button type="submit">
          Apply filters
        </Button>
      </Group>
    </form>
  </Drawer>;
}

export function filterUsers(users: User[], filters: Filters) {
  return users.filter(user => {
    if (filters.emails && !filters.emails.includes(user.email)) {
      return false;
    }

    if (filters.firstnames && !filters.firstnames.includes(user.firstname)) {
      return false;
    }

    if (filters.lastnames && !filters.lastnames.includes(user.lastname)) {
      return false;
    }

    if (filters.isAdmin && !user.isAdmin === filters.isAdmin) {
      return false;
    }

    if (filters.isUser && user.isAdmin === filters.isUser) {
      return false;
    }

    if (filters.createdAtStart && new Date(user.createdAt) < filters.createdAtStart) {
      return false;
    }

    if (filters.createdAtEnd && new Date(user.createdAt) > filters.createdAtEnd) {
      return false;
    }

    if (filters.updatedAtStart) {
      if(user.updatedAt && new Date(user.updatedAt) < filters.updatedAtStart) {
        return false;
      }
      if(!user.updatedAt) {
        return false;
      }
    }
    if (filters.updatedAtEnd) {
      if(user.updatedAt && new Date(user.updatedAt) > filters.updatedAtEnd) {
        return false;
      }
      if(!user.updatedAt) {
        return false;
      }
    }

    if (filters.deletedAtStart) {
      if(user.deletedAt && new Date(user.deletedAt) < filters.deletedAtStart) {
        return false;
      }
      if(null === user.deletedAt) {
        return false;
      }
    }

    if (filters.deletedAtEnd) {
      if(user.deletedAt && new Date(user.deletedAt) > filters.deletedAtEnd) {
        return false;
      }
      if(null === user.deletedAt) {
        return false;
      }
    }

    // noinspection RedundantIfStatementJS
    return true;
  });
}

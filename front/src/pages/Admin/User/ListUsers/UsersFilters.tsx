import { useState } from 'react';
import { User } from '@app/pages/Admin/User/ListUsers/ListUsers.tsx';
import { Button, Menu, Switch } from '@mantine/core';
import { trans } from '@app/translations';
import TextInput from '@app/components/UI/Form/TextInput.tsx';
import Label = Menu.Label;

export interface Filters {
  email?: string | null
  firstname?: string | null
  lastname?: string | null
  isAdmin?: boolean | null
}

interface Props {
  users: readonly User[]
  onSubmit: (filters: Filters) => void
  initialFilters?: Filters
}

export default function UsersFilters({
  users,
  onSubmit,
  initialFilters,
}: Props) {
  const [email, setEmail] = useState<string | null>(initialFilters?.email ?? null);
  const [firstname, setFirstname] = useState<string | null>(initialFilters?.firstname ?? null);
  const [lastname, setLastname] = useState<string | null>(initialFilters?.lastname ?? null);
  const [isAdmin, setIsAdmin] = useState<boolean>(initialFilters?.isAdmin ?? false);

  // @ts-ignore
  function clear(e) {
    setEmail(null);
    setFirstname(null);
    setLastname(null);
    setIsAdmin(false);

    onSubmit({});
    e.currentTarget.blur();
  }

  // @ts-ignore
  function submit(e) {
    e.preventDefault();
    e.currentTarget.blur();
    onSubmit({ email, firstname, lastname, isAdmin });
  }

  return (
    <form onSubmit={submit}>
      <Label>Email</Label>
      <TextInput<string> id="email"
        label="Email"
        value={email}
        onChangedValue={setEmail}
        dataList={users.map(user => [user.uid, user.email])}
      />
      <TextInput<string> id="firstname"
        label="Firstname"
        value={firstname}
        onChangedValue={setFirstname}
        dataList={users.map(user => [user.uid, user.firstname])}
      />
      <TextInput<string> id="lastname"
        label="Lastname"
        value={lastname}
        onChangedValue={setLastname}
        dataList={users.map(user => [user.uid, user.lastname])}
      />
      <Switch
        checked={isAdmin ?? false}
        onChange={(event) => setIsAdmin(event.currentTarget.checked)}
        label={trans('pages.admin.user.form.isAdmin')}
      />
      <Button onClick={clear} color="blue" variant="outline">
        Clear filters
      </Button>
      <Button type="submit" color="blue">
        Apply filters
      </Button>
    </form>
  );
}

export function filterUsers(users: User[], filters: Filters) {
  return users.filter(user => {

    if (filters.email && !user.email.includes(filters.email)) {
      return false;
    }

    if (filters.firstname && !user.firstname.includes(filters.firstname)) {
      return false;
    }

    if (filters.lastname && !user.lastname.includes(filters.lastname)) {
      return false;
    }

    if (filters.isAdmin && !user.isAdmin === filters.isAdmin) {
      return false;
    }

    // noinspection RedundantIfStatementJS
    return true;
  });
}

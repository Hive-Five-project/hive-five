import { FormEvent, useState } from 'react';
import { FormErrorsMap } from '@app/components/UI/Form';
import { route } from '@app/router/generator';
import { UserForAdmin as User } from '@app/models/types/User.ts';
import usePreviousUrlFromLocation from '@app/hooks/usePreviousUrlLocationState.tsx';
import { Button, Space, Stack, Switch } from '@mantine/core';
import { trans } from '@app/translations';
import { FormRootErrors } from '@app/pages/Error/FormRootErrors.tsx';
import CompactTextInput from '@app/components/UI/CompactInput/CompactTextInput.tsx';
import ListUsers from '@app/pages/Admin/User/ListUsers/ListUsers.tsx';

export interface UserData {
  email: string | null
  firstname: string | null
  lastname: string | null
  isAdmin: boolean | null
}

interface Props {
  onSubmit: (payload: UserData) => void
  errors?: FormErrorsMap<keyof UserData>
}

interface CreateProps extends Props {
  initialData?: never
}

interface UpdateProps extends Props {
  initialData: User
}

export default function UserForm({
  onSubmit,
  initialData = undefined,
  errors = {},
}: CreateProps | UpdateProps) {

  const isUpdate = initialData !== undefined;
  const { previousUrl } =  usePreviousUrlFromLocation();
  const [isAdmin, setIsAdmin] = useState<boolean>(initialData?.isAdmin ?? false);
  const [lastname, setLastname] = useState<string | null>(initialData?.lastname ?? null);
  const [firstname, setFirstname] = useState<string | null>(initialData?.firstname ?? null);
  const [email, setEmail] = useState<string | null>(initialData?.email ?? null);

  function submit(event: FormEvent<HTMLFormElement>): void {
    // Prevent default to avoid page reload.
    event.preventDefault();

    onSubmit({
      email,
      firstname,
      lastname,
      isAdmin,
    });
  }


  return <form className="mb-10 max-w-screen-lg" onSubmit={submit}>
    <Space h={8} />
    <a href={previousUrl ?? route(ListUsers)}>{trans('pages.admin.user.list.return')}</a>

    <h2>{isUpdate ? trans('pages.admin.user.update.documentTitle') : trans('pages.admin.user.create.documentTitle')}</h2>
    <FormRootErrors errors={errors?.__root} />

    <Stack>
      <CompactTextInput
        id="email"
        label={trans('pages.admin.user.form.email')}
        type="text"
        value={email ?? ''}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoFocus
        error={errors?.email}
      />
      <CompactTextInput
        id="firstname"
        label={trans('pages.admin.user.form.firstname')}
        type="text"
        value={firstname ?? ''}
        onChange={(e) => setFirstname(e.target.value)}
        required
        autoFocus
        error={errors?.firstname}
      />
      <CompactTextInput
        id="lastname"
        label={trans('pages.admin.user.form.lastname')}
        type="text"
        value={lastname ?? ''}
        onChange={(e) => setLastname(e.target.value)}
        required
        error={errors?.lastname}
      />
      <Switch
        checked={isAdmin}
        onChange={(event) => setIsAdmin(event.currentTarget.checked)}
        label={trans('pages.admin.user.form.isAdmin')}
        error={errors?.isAdmin}
      />

      <Button
        type="submit"
      >
        {isUpdate ?
          trans('pages.admin.user.update.documentTitle')
          : trans('pages.admin.user.create.documentTitle')}
      </Button>
    </Stack>
  </form>;
}

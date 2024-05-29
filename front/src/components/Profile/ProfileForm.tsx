import { FormEvent, useState } from 'react';
import { FormErrorsMap } from '@app/components/UI/Form';
import { UserForAdmin } from '@app/models/types/User.ts';
import { Button, Container, Space, Stack} from '@mantine/core';
import { trans } from '@app/translations';
import CompactTextInput from '@app/components/UI/CompactInput/CompactTextInput.tsx';
import {route} from "@app/router/generator.ts";
import Profile from "@app/pages/Profile/Profile.tsx";
import usePreviousUrlFromLocation from "@app/hooks/usePreviousUrlLocationState.tsx";


export interface ProfileData {
  firstname: string | null
  lastname: string | null
  email: string | null
}

interface Props {
  onSubmit: (payload: ProfileData) => void
  errors?: FormErrorsMap<keyof ProfileData>
}

interface UpdateProps extends Props {
  initialData?: UserForAdmin
}

export default function ProfileForm({
  onSubmit,
  initialData = undefined,
}: UpdateProps) {
  const { previousUrl } =  usePreviousUrlFromLocation();
  const [firstname, setFirstName] = useState<string | null>(initialData?.firstname ?? null);
  const [lastname, setLastName] = useState<string | null>(initialData?.lastname ?? null);
  const [email, setEmail] = useState<string | null>(initialData?.email ?? null);

  function submit(event: FormEvent<HTMLFormElement>): void {
    // Prevent default to avoid page reload.
    event.preventDefault();

    onSubmit({
      firstname,
      lastname,
      email,
    });
  }

  return <Container px="md">
    <form id="login" onSubmit={submit}>
      <a href={previousUrl ?? route(Profile)}> Retour à la liste</a>
      <h2>{trans('pages.login.documentTitle')}</h2>
      <Stack>
        <CompactTextInput
          id="firstname"
          type="text"
          value={firstname ?? ''}
          onChange={(e) => setFirstName(e.target.value)}
          required
          autoFocus
        />
        <CompactTextInput
          id="lastname"
          type="text"
          value={lastname ?? ''}
          onChange={(e) => setLastName(e.target.value)}
          required
          autoFocus
        />
        <CompactTextInput
          id="email"
          type="email"
          value={email ?? ''}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          autoComplete="email"
        />
        <Button type="submit"> {trans('pages.profile.updateProfile')} </Button>
      </Stack>
    </form>
    <Space h="md"/>
  </Container>;
}

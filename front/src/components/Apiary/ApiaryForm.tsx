import { FormEvent, useState } from 'react';
import { FormErrorsMap } from '@app/components/UI/Form';
import { route } from '@app/router/generator';
import { Apiary } from '@app/models/types/Apiary.ts';
import usePreviousUrlFromLocation from '@app/hooks/usePreviousUrlLocationState.tsx';
import { Button, Stack } from '@mantine/core';
import { trans } from '@app/translations';
import ApiaryList from '@app/pages/Apiary/ApiaryList.tsx';
import ApiaryHome from '@app/pages/Apiary/ApiaryHome.tsx';
import { FormRootErrors } from '@app/pages/Error/FormRootErrors.tsx';
import CompactTextInput from '@app/components/UI/CompactInput/CompactTextInput.tsx';
import TopNavigationMenu from '../UI/TopNavigation/TopNavigationMenu';

export interface ApiaryData {
  name: string | null
  address: string | null
}

interface Props {
  onSubmit: (payload: ApiaryData) => void
  errors?: FormErrorsMap<keyof ApiaryData>
}

interface CreateProps extends Props {
  initialData?: never
}

interface UpdateProps extends Props {
  initialData: Apiary
}

export default function ApiaryForm({
  onSubmit,
  initialData = undefined,
  errors = {},
}: CreateProps | UpdateProps) {

  const isUpdate = initialData !== undefined;
  const { previousUrl } =  usePreviousUrlFromLocation();

  const uid = initialData?.uid ?? null;
  const [name, setName] = useState<string | null>(initialData?.name ?? null);
  const [address, setAddress] = useState<string | null>(initialData?.address ?? null);

  function submit(event: FormEvent<HTMLFormElement>): void {
    // Prevent default to avoid page reload.
    event.preventDefault();

    onSubmit({
      name,
      address,
    });
  }

  return <form className="mb-10 max-w-screen-lg" onSubmit={submit}>
    <TopNavigationMenu
      previousPath={previousUrl ?? (uid ? route(ApiaryHome, { uid }) : route(ApiaryList))}
    />

    <h2>
      {isUpdate
        ? trans('pages.apiaryForm.update.documentTitle')
        : trans('pages.apiaryForm.create.documentTitle')}
    </h2>
    <FormRootErrors errors={errors?.name} />

    <Stack>
      <CompactTextInput
        id="apiaryName"
        label={trans('pages.apiaryForm.addApiaryName')}
        type="text"
        value={name ?? ''}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
      />
      <CompactTextInput
        id="apiaryAddress"
        label={trans('pages.apiaryForm.addApiaryAddress')}
        type="text"
        value={address ?? ''}
        onChange={(e) => setAddress(e.target.value)}
        required

      />
      <Button
        type="submit"
      >
        {isUpdate
          ? trans('pages.apiaryForm.update.buttonSubmit')
          : trans('pages.apiaryForm.create.buttonSubmit')}
      </Button>
    </Stack>
  </form>;
}

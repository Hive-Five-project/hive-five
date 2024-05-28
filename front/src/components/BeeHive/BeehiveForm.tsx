import { FormEvent, useState } from 'react';
import { FormErrorsMap } from '@app/components/UI/Form';
import usePreviousUrlFromLocation from '@app/hooks/usePreviousUrlLocationState.tsx';
import { Button, Stack } from '@mantine/core';
import { trans } from '@app/translations';
import { FormRootErrors } from '@app/pages/Error/FormRootErrors.tsx';
import CompactTextInput from '@app/components/UI/CompactInput/CompactTextInput.tsx';
import { Beehive } from '@app/models/types/Beehive';
import { useParams } from 'react-router-dom';
import TopNavigationMenu from '../UI/TopNavigation/TopNavigationMenu';
import ApiaryHome from '@app/pages/Apiary/ApiaryHome';
import ApiaryList from '@app/pages/Apiary/ApiaryList';
import { route } from '@app/router/generator';
import CompactSelect from '../UI/CompactInput/CompactSelect';
import BeehiveHome from '@app/pages/Beehive/BeehiveHome';



export interface BeehiveData {
  name: string | null
  bee: string | null
  age: number | null
  apiary: string | null
}

interface Props {
  onSubmit: (payload: BeehiveData) => void
  errors?: FormErrorsMap<keyof BeehiveData>
}

interface CreateProps extends Props {
  initialData?: never
}

interface UpdateProps extends Props {
  initialData: Beehive
}

export default function BeehiveForm({
  onSubmit,
  initialData = undefined,
  errors = {},
}: CreateProps | UpdateProps) {

  const { uid } = useParams();
  const isUpdate = initialData !== undefined;
  const { previousUrl } = usePreviousUrlFromLocation();
  const beeTypes = ['Black', 'Italian', 'Caucasian', 'Carnolien', 'Buckfast'];
  const [name, setName] = useState<string | null>(initialData?.name ?? null);
  const [age, setAge] = useState<number | null>(initialData?.age ?? null);
  const [bee, setBee] = useState<string | null>(initialData?.bee ?? null);
  const apiary = (initialData?.apiary.uid ?? uid!);

  function submit(event: FormEvent<HTMLFormElement>): void {
    // Prevent default to avoid page reload.
    event.preventDefault();
    onSubmit({
      name,
      age: Number(age),
      bee,
      apiary,
    });
  }

  return <form className="mb-10 max-w-screen-lg" onSubmit={submit}>
    {
      !isUpdate ?
        <TopNavigationMenu
          previousPath={previousUrl ?? (uid ? route(ApiaryHome, { uid }) : route(ApiaryList))} /> :
        <TopNavigationMenu
          previousPath={previousUrl ?? (uid ? route(BeehiveHome, { uid }) : route(ApiaryList))} />
    }

    <h2>
      {isUpdate
        ? trans('pages.beehiveForm.update.documentTitle')
        : trans('pages.apiaryForm.create.documentTitle')}
    </h2>
    <FormRootErrors errors={errors?.name} />
    <Stack>
      <CompactTextInput
        id="beehiveName"
        label={trans('pages.beehiveForm.beehiveName')}
        type="text"
        value={name ?? ''}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
      />
      <CompactSelect
        id="beesType"
        label={trans('pages.beehiveForm.beesType')}
        type="text"
        data={beeTypes}
        value={bee ?? ''}
        onChange={setBee}
        required
      />
      <CompactTextInput
        id="beehiveAge"
        label={trans('pages.beehiveForm.queenAge')}
        type="number"
        value={age ?? ''}
        onChange={(e) => setAge(e.target.valueAsNumber)}
        required
      />
      <Button
        type="submit"
      >
        {isUpdate ? trans('pages.beehiveForm.update.buttonSubmit') : trans('pages.beehiveForm.create.buttonSubmit')}
      </Button>
    </Stack>
  </form>;
}

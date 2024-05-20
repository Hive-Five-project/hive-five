import { FormEvent, useState } from 'react';
import { FormErrorsMap } from '@app/components/UI/Form';
import usePreviousUrlFromLocation from '@app/hooks/usePreviousUrlLocationState.tsx';
import { Button, Space, Stack } from '@mantine/core';
import { trans } from '@app/translations';
import { FormRootErrors } from '@app/pages/Error/FormRootErrors.tsx';
import CompactTextInput from '@app/components/UI/CompactInput/CompactTextInput.tsx';
import { Beehive } from '@app/models/types/Beehive';
import { Apiary } from '@app/models/types/Apiary';


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

    const isUpdate = initialData !== undefined;
    const { previousUrl } = usePreviousUrlFromLocation();
   
    const [name, setName] = useState<string | null>(initialData?.name ?? null);
    const [age, setAge] = useState<number | null>(initialData?.age ?? null);
    const [bee, setBee] = useState<string | null>(initialData?.bee ?? null);
  
    function submit(event: FormEvent<HTMLFormElement>): void {
        // Prevent default to avoid page reload.
        event.preventDefault();
        //console.log(apiary.uid);
        // onSubmit({
        //     name,
        //     age,
        //     bee,
        //     apiary,
        // });
    }

    return <form className="mb-10 max-w-screen-lg" onSubmit={submit}>
        {/* <TopNavigationMenu
            previousPath={
                uid
                    ? route(ApiaryHome, { uid: uid })
                    : route(ApiaryList)
            } /> */}

        <h2>
            {isUpdate
                ? trans('pages.beehiveForm.update.documentTitle')
                : trans('pages.apiaryForm.create.documentTitle')}
        </h2>
        <FormRootErrors errors={errors?.name} />
        <Stack>
            <CompactTextInput
                id="apiaryName"
                label={trans('pages.beehiveForm.beehiveName')}
                type="text"
                value={name ?? ''}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
            />
            <CompactTextInput
                id="apiaryName"
                label={trans('pages.beehiveForm.beesType')}
                type="enums"
                value={bee ?? ''}
                onChange={(e) => setBee(e.target.value)}
                required
                autoFocus
            />
            <CompactTextInput
                id="apiaryAddress"
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

import CompactTextInput from "@app/components/UI/CompactInput/CompactTextInput";

import { declareRoute } from "@app/router/router";
import { trans } from "@app/translations";
import { Container, Stack, Alert, Button, Space } from "@mantine/core";

import { APIARY_ADD_PATH } from '@app/paths';
import { useDocumentTitle } from "@mantine/hooks";
import { FormEvent, useState } from "react";
import { useMutation } from '@app/api/apollo/useMutation';
import CreateApiaryMutation from '@graphql/mutation/apiary/CreateApiary.graphql';
import { useAuthContext } from "@app/hooks/useAuthContext";


interface MutationResponse {
  Apiary: {
    apiaryCreated: boolean
  }
}
const ApiaryForm = declareRoute(function Page() {
  useDocumentTitle(trans('pages.apiaryForm.documentTitle'));

  const [address, setAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [apiaryCreated, apiaryCreatedState] = useMutation<MutationResponse>(CreateApiaryMutation);
  const hasError =
  !apiaryCreatedState.loading &&
  apiaryCreatedState.called &&
  (apiaryCreatedState.error || !apiaryCreatedState.data?.Apiary?.apiaryCreated)
;
const hasSuccess = apiaryCreatedState.called && apiaryCreatedState.data?.Apiary.apiaryCreated;
const { profile } = useAuthContext();

function onSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  void apiaryCreated({ variables: {  payload: {
    name: name,
    address: address,
  }, } });
}

    return <Container px="md">
         {hasSuccess && <Alert color="success">
      Ruhcer correctement ajouté
    </Alert>}

       {hasError && <Alert color="error">
      Une erreur est survenue.
    </Alert>}
    <form id="create-apiary" onSubmit={onSubmit}>
   
      <Stack>
        <h2>{trans('pages.apiaryList.addButtonText')}</h2>
        <CompactTextInput
          id="apiaryName"
          label={trans('pages.apiaryForm.addApiaryName')}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
        <CompactTextInput
          id="apiaryAddress"
          label={trans('pages.apiaryForm.addApiaryAddress')}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        
        />
        <Button
          type="submit"
          disabled={apiaryCreatedState.loading}
        >
          Ajouter le rucher
        </Button>
      </Stack>
    </form>
    <Space h="md" />
  </Container>;
}, APIARY_ADD_PATH);

export default ApiaryForm;
import CompactTextInput from "@app/components/UI/CompactInput/CompactTextInput";

import { declareRoute } from "@app/router/router";
import { trans } from "@app/translations";
import { Container, Stack, Alert, Button, Space } from "@mantine/core";

import { APIARY_ADD_PATH, APIARY_LIST_PATH } from '@app/paths';
import { useDocumentTitle } from "@mantine/hooks";
import { FormEvent, useEffect, useState } from "react";
import { useMutation } from '@app/api/apollo/useMutation';
import CreateApiaryMutation from '@graphql/mutation/apiary/CreateApiary.graphql';
import { Navigate, useNavigate } from "react-router-dom";


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

const navigate=useNavigate()
useEffect(()=>{
  if(apiaryCreatedState.called && apiaryCreatedState.data?.Apiary.apiaryCreated)
  {
     navigate(APIARY_LIST_PATH);
  }
},[apiaryCreatedState,navigate])


function onSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  void apiaryCreated({ variables: {  payload: {
    name: name,
    address: address,
  }, } });
}

    return <Container px="md">
     
    <form id="create-apiary" onSubmit={onSubmit}>
           <h2>{trans('pages.apiaryList.addButtonText')}</h2>

      <Stack>
        

      
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
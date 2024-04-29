import { declareRoute } from '@app/router/router';
import { trans } from '@app/translations';
import { Container } from '@mantine/core';
import { APIARY_ADD_PATH } from '@app/paths';
import { useDocumentTitle } from '@mantine/hooks';
import { useMemo } from 'react';
import { useMutation } from '@app/api/apollo/useMutation';
import CreateApiaryMutation from '@graphql/mutation/apiary/CreateApiary.graphql';
import { useNavigate } from "react-router-dom";
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes.ts';
import usePreviousUrlFromLocation from '@app/hooks/usePreviousUrlLocationState.tsx';
import ApiaryForm, { ApiaryData } from '@app/components/Apiary/ApiaryForm.tsx';
import { route } from '@app/router/generator.ts';
import { onMutateError } from '@graphql/utils.ts';
import { onCreateApiary } from '@graphql/store/apiaries.ts';
import ApiaryUpdate from '@app/pages/Apiary/Forms/ApiaryUpdate.tsx';


interface MutationResponse {
  Apiary: {
    create: {
      uid: string
    }
  }
}

const ApiaryCreatePage = declareRoute(function ApiaryCreate() {
  useDocumentTitle(trans('pages.apiaryForm.create.documentTitle'));
  const { previousUrl } = usePreviousUrlFromLocation();

  const navigate = useNavigate()
  const [mutate, { error }] = useMutation<MutationResponse>(CreateApiaryMutation, {
    update(cache, { data }) {
      onCreateApiary(cache, data!.Apiary.create);
    },
  });

  const mappedErrors = useMemo(() => ({
    __root: error ? trans('pages.apiaryForm.create.errorSubmit') : undefined,
    ...(error ? errorsByPath(error.graphQLErrors as AppGraphQLError[]) : {}),
  }), [error]);

  async function submit(payload: ApiaryData) {
    mutate({
      variables: { payload },
    }).then((response) => {
      navigate(route(ApiaryUpdate, { uid: response.data!.Apiary.create.uid }), {
        state: {
          apiaryCreated: true,
          previousUrl,
        },
      });
    }).catch(onMutateError);
  }
  return <Container px="md">
    <ApiaryForm onSubmit={submit} errors={mappedErrors} />
  </Container>;
}, APIARY_ADD_PATH);

export default ApiaryCreatePage;

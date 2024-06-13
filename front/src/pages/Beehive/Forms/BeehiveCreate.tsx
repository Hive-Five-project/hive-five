import { declareRoute } from '@app/router/router';
import { trans } from '@app/translations';
import { Container } from '@mantine/core';
import { BEEHIVE_ADD_PATH } from '@app/paths';
import { useDocumentTitle } from '@mantine/hooks';
import { useMemo } from 'react';
import { useMutation } from '@app/api/apollo/useMutation';
import CreateBeehiveMutation from '@graphql/mutation/beehive/CreateBeehive.graphql';
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes.ts';
import { onMutateError } from '@graphql/utils.ts';
import BeehiveForm, { BeehiveData } from '@app/components/BeeHive/BeehiveForm';
import Alert from '@app/pages/Error/Alert';


interface MutationResponse {
  Beehive: {
    create: {
      uid: string
      apiary: {
        uid: string
      }
    }
  }
}


const BeehiveCreatePage = declareRoute(function BeehiveCreate() {
  useDocumentTitle(trans('pages.beehiveForm.create.documentTitle'));
  const [mutate, mutationState] = useMutation<MutationResponse>(CreateBeehiveMutation);

  const mappedErrors = useMemo(() => {
    const error = mutationState.error;

    return {
      __root: error ? trans('pages.beehiveForm.update.errorSubmit') : undefined,
      ...(error ? errorsByPath(error.graphQLErrors as AppGraphQLError[]) : {}),
    };
  }, [mutationState.error]);

  async function submit(payload: BeehiveData) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    mutate({
      variables: { payload },
    }).catch(onMutateError);
  }

  return <Container px="md">
    {mutationState.called && mutationState.data?.Beehive.create.uid && <Alert title="Success" variant="success">
      Ruche créée avec succès.
    </Alert>}
    {mutationState.error && <Alert title="Fail" variant="warning">
      Erreur lors de la création
    </Alert>}
    <BeehiveForm onSubmit={submit} errors={mappedErrors} />

  </Container>;

}, BEEHIVE_ADD_PATH);

export default BeehiveCreatePage;

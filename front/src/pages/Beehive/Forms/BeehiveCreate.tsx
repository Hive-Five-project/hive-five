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
import usePreviousUrlFromLocation from '@app/hooks/usePreviousUrlLocationState.tsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@app/router/generator.ts';
import { onCreateBeehive } from '@graphql/store/beehives.ts';
import BeehiveUpdate from '@app/pages/Beehive/Forms/BeehiveUpdate.tsx';


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
  const { previousUrl } = usePreviousUrlFromLocation();

  const navigate = useNavigate();
  const [mutate, { error }] = useMutation<MutationResponse>(CreateBeehiveMutation, {
    update(cache, { data }) {
      onCreateBeehive(cache, data!.Beehive.create);
    },
  });

  const mappedErrors = useMemo(() => ({
    __root: error ? trans('pages.beehiveForm.create.errorSubmit') : undefined,
    ...(error ? errorsByPath(error.graphQLErrors as AppGraphQLError[]) : {}),
  }), [error]);

  async function submit(payload: BeehiveData) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    mutate({
      variables: { payload },
    }).then((response) => {
      navigate(route(BeehiveUpdate, { uid: response.data!.Beehive.create.uid }), {
        state: {
          beehiveCreated: true,
          previousUrl,
        },
      });
    }).catch(onMutateError);
  }

  return <Container px="md">
    <BeehiveForm onSubmit={submit} errors={mappedErrors} />
  </Container>;

}, BEEHIVE_ADD_PATH);

export default BeehiveCreatePage;

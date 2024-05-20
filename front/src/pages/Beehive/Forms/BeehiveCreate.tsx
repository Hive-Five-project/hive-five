import { declareRoute } from '@app/router/router';
import { trans } from '@app/translations';
import { Container } from '@mantine/core';
import { BEEHIVE_ADD_PATH } from '@app/paths';
import { useDocumentTitle } from '@mantine/hooks';
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import FindApiaryQuery from '@graphql/query/apiary/FindApiary.graphql';
import { useMutation } from '@app/api/apollo/useMutation';
import CreateBeehiveMutation from '@graphql/mutation/beehive/CreateBeehive.graphql';
import { useNavigate, useParams } from "react-router-dom";
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes.ts';
import usePreviousUrlFromLocation from '@app/hooks/usePreviousUrlLocationState.tsx';
import { route } from '@app/router/generator.ts';
import { onMutateError } from '@graphql/utils.ts';
import BeehiveForm, { BeehiveData } from '@app/components/BeeHive/BeehiveForm';
import { onCreateBeehive } from '@app/api/graphql/store/beehives';
import BeehiveUpdate from './BeehiveUpdate';
import { Apiary } from '@app/models/types/Apiary';
import { useNotFoundHandler } from '@app/components/ErrorBoundary.tsx';


interface MutationResponse {
  Beehive: {
    create: {
      uid: string
    }
  }
}

interface FindApiaryQueryResponse {
  Apiary: {
    find: Apiary
  }
}

const BeehiveCreatePage = declareRoute(function BeehiveCreate() {
  useDocumentTitle(trans('pages.beehiveForm.create.documentTitle'));
  const { previousUrl } = usePreviousUrlFromLocation();
 
  const [mutate, { error }] = useMutation<MutationResponse>(CreateBeehiveMutation, {
    update(cache, { data }) {
      onCreateBeehive(cache, data!.Beehive.create);
    },
  });
  const notFoundHandler = useNotFoundHandler();
  const navigate = useNavigate();

  const { uid } = useParams();

  const queryFindApiary = useQuery<FindApiaryQueryResponse>(FindApiaryQuery, {
    variables: { uid },
    context: {
      // On GraphQL Not Found error, show a Not Found page
      onNotFound: notFoundHandler,
    },
  });

  const apiary = queryFindApiary.data?.Apiary.find;

  const mappedErrors = useMemo(() => ({
    __root: error ? trans('pages.beehiveForm.create.errorSubmit') : undefined,
    ...(error ? errorsByPath(error.graphQLErrors as AppGraphQLError[]) : {}),
  }), [error]);

  async function submit(payload: BeehiveData) {
    payload.apiary!=apiary?.uid
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

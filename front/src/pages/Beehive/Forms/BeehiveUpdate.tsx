import { declareRoute } from '@app/router/router.tsx';
import { useDocumentTitle } from '@mantine/hooks';
import FindBeehiveQuery from '@graphql/query/beehive/FindBeehive.graphql';
import UpdateBeehiveMutation from '@graphql/mutation/beehive/UpdateBeehive.graphql';
import { trans } from '@app/translations';
import { useParams } from 'react-router-dom';
import { useNotFoundHandler } from '@app/components/ErrorBoundary.tsx';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useMutation } from '@app/api/apollo/useMutation.ts';
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes.ts';
import { onMutateError } from '@graphql/utils.ts';
import UnexpectedError from '@app/errors/UnexpectedError.ts';
import Alert from '@app/pages/Error/Alert.tsx';
import { BEEHIVE_UPDATE_PATH } from '@app/paths.ts';
import { Container } from '@mantine/core';
import { Beehive } from '@app/models/types/Beehive';
import BeehiveForm, { BeehiveData } from '@app/components/BeeHive/BeehiveForm';


interface MutationResponse {
  Beehive: {
    update: {
      uid: string
    }
  }
}

interface FindBeehiveQueryResponse {
  Beehive: {
    find: Beehive
  }
}


const BeehiveUpdatePage = declareRoute(function BeehiveUpdate() {
  useDocumentTitle(trans('pages.beehiveForm.update.documentTitle'));

  const { uid } = useParams();
  const notFoundHandler = useNotFoundHandler();

  const query = useQuery<FindBeehiveQueryResponse>(FindBeehiveQuery, {
    variables: { uid },
    context: {
      // On GraphQL Not Found error, show a Not Found page
      onNotFound: notFoundHandler,
    },
  });
  const beehive = query.data?.Beehive.find;

  const [mutate, mutationState] = useMutation<MutationResponse>(UpdateBeehiveMutation);

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
      variables: { uid, payload },
    }).catch(onMutateError);
  }

  if (query.error) {
    throw new UnexpectedError(query.error.message, query.error);
  }

  if (query.loading) {
    // TODO: better loading state, with a dedicated skeleton or generic loader?
    return <p>{trans('common.loading')}</p>;
  }



  return <Container px="md">
    {mutationState.called && mutationState.data?.Beehive && <Alert title="Success" variant="success">
      Ruche modifiée avec succès.
    </Alert>}
    {mutationState.error && <Alert title="Fail" variant="warning">
      Erreur lors de la modification Resaisissez les données
    </Alert>}

    <BeehiveForm onSubmit={submit} errors={mappedErrors} initialData={beehive} />

  </ Container>;
}, BEEHIVE_UPDATE_PATH);

export default BeehiveUpdatePage;

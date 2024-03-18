import { declareRoute } from '@app/router/router.tsx';
import { useDocumentTitle } from '@mantine/hooks';
import FindApiaryQuery from '@graphql/query/apiary/FindApiary.graphql';
import UpdateApiaryMutation from '@graphql/mutation/apiary/UpdateApiary.graphql';
import { trans } from '@app/translations';
import { useLocation, useParams } from 'react-router-dom';
import { useNotFoundHandler } from '@app/components/ErrorBoundary.tsx';
import { Apiary } from '@app/models/types/Apiary.ts';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useMutation } from '@app/api/apollo/useMutation.ts';
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes.ts';
import ApiaryForm, { ApiaryData } from '@app/components/Apiary/ApiaryForm.tsx';
import { onMutateError } from '@graphql/utils.ts';
import UnexpectedError from '@app/errors/UnexpectedError.ts';
import Alert from '@app/pages/Error/Alert.tsx';
import { APIARY_UPDATE_PATH } from '@app/paths.ts';
import { Container } from '@mantine/core';


interface MutationResponse {
  Apiary: {
    update: {
      uid: string
    }
  }
}

interface FindApiaryQueryResponse {
  Apiary: {
    find: Apiary
  }
}

interface RedirectFromCreationState {
  apiaryCreated: boolean
}

const Page = declareRoute(function UpdateCategory() {
  useDocumentTitle(trans('pages.apiaryForm.update.documentTitle'));

  const { uid } = useParams();
  const notFoundHandler = useNotFoundHandler();
  const { apiaryCreated = false } = (useLocation().state ?? {}) as RedirectFromCreationState;

  const query = useQuery<FindApiaryQueryResponse>(FindApiaryQuery, {
    variables: { uid },
    context: {
      // On GraphQL Not Found error, show a Not Found page
      onNotFound: notFoundHandler,
    },
  });

  const [mutate, mutationState] = useMutation<MutationResponse>(UpdateApiaryMutation);

  const mappedErrors = useMemo(() => {
    const error = mutationState.error;

    return {
      __root: error ? 'Une erreur est survenue lors de la soumission du formulaire.' : undefined,
      ...(error ? errorsByPath(error.graphQLErrors as AppGraphQLError[]) : {}),
    };
  }, [mutationState.error]);

  async function submit(payload: ApiaryData) {
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

  const apiary = query.data!.Apiary.find;

  return <Container px="md">
    {apiaryCreated && !mutationState.called && <Alert title="Success" variant="success">
      Rucher créé avec succès.
    </Alert>}

    {mutationState.called && mutationState.data?.Apiary && <Alert title="Success" variant="success">
      Rucher modifié avec succès.
    </Alert>}

    <ApiaryForm onSubmit={submit} errors={mappedErrors} initialData={apiary} />

  </ Container>;
}, APIARY_UPDATE_PATH );

export default Page;

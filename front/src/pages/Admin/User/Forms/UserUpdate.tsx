import { declareAdminRoute } from '@app/router/router.tsx';
import { useDocumentTitle } from '@mantine/hooks';
import FindUserQuery from '@graphql/query/user/FindUser.graphql';
import UpdateUserMutation from '@graphql/mutation/user/UpdateUser.graphql';
import { trans } from '@app/translations';
import { useLocation, useParams } from 'react-router-dom';
import { useNotFoundHandler } from '@app/components/ErrorBoundary.tsx';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useMutation } from '@app/api/apollo/useMutation.ts';
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes.ts';
import { onMutateError } from '@graphql/utils.ts';
import UnexpectedError from '@app/errors/UnexpectedError.ts';
import Alert from '@app/pages/Error/Alert.tsx';
import { USER_UPDATE_PATH } from '@app/paths.ts';
import { Container } from '@mantine/core';
import { UserForAdmin as User } from '@app/models/types/User.ts';
import UserForm, { UserData } from '@app/components/User/UserForm.tsx';

interface MutationResponse {
  User: {
    update: {
      uid: string
    }
  }
}

interface FindUserQueryResponse {
  User: {
    find: User
  }
}

interface RedirectFromCreationState {
  userCreated: boolean
}

const Page = declareAdminRoute(function UpdateUser() {
  useDocumentTitle(trans('pages.apiaryForm.update.documentTitle'));

  const { id : uid } = useParams();
  const notFoundHandler = useNotFoundHandler();
  const { userCreated } = (useLocation().state ?? {}) as RedirectFromCreationState;

  const query = useQuery<FindUserQueryResponse>(FindUserQuery, {
    variables: { uid },
    context: {
      // On GraphQL Not Found error, show a Not Found page
      onNotFound: notFoundHandler,
    },
  });

  const [mutate, mutationState] = useMutation<MutationResponse>(UpdateUserMutation);

  const mappedErrors = useMemo(() => {
    const error = mutationState.error;

    return {
      __root: error ? trans('pages.fatalError.form') : undefined,
      ...(error ? errorsByPath(error.graphQLErrors as AppGraphQLError[]) : {}),
    };
  }, [mutationState.error]);

  async function submit(payload: UserData) {
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

  const user = query.data!.User.find;

  return <Container px="md">
    {userCreated && !mutationState.called && <Alert title="Success" variant="success">
      {trans('pages.admin.user.form.successCreate')}
    </Alert>}

    {mutationState.called && mutationState.data?.User && <Alert title="Success" variant="success">
      {trans('pages.admin.user.form.successUpdate')}
    </Alert>}

    <UserForm onSubmit={submit} errors={mappedErrors} initialData={user} />

  </ Container>;
}, USER_UPDATE_PATH );

export default Page;

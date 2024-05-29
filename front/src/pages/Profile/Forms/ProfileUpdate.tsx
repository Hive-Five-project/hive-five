import { declareRoute } from '@app/router/router.tsx';
import { useDocumentTitle } from '@mantine/hooks';
import FindUserQuery from '@graphql/query/user/Me.graphql';
import UpdateProfileMutation from '@graphql/mutation/user/UpdateMe.graphql';
import { trans } from '@app/translations';
import { useNotFoundHandler } from '@app/components/ErrorBoundary.tsx';
import { UserForAdmin } from '@app/models/types/User.ts';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useMutation } from '@app/api/apollo/useMutation.ts';
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes.ts';
import ProfileForm, { ProfileData } from '@app/components/Profile/ProfileForm.tsx';
import { onMutateError } from '@graphql/utils.ts';
import UnexpectedError from '@app/errors/UnexpectedError.ts';
import Alert from '@app/pages/Error/Alert.tsx';
import { PROFILE_UPDATE_PATH } from '@app/paths.ts';
import { Container } from '@mantine/core';
import {useAuthContext} from "@app/hooks/useAuthContext.tsx";


interface MutationResponse {
  User: {
    updateMyProfile: {
      uid: string
    }
  }
}

interface FindProfileQueryResponse {
  User: {
    me: UserForAdmin
  }
}

const Page = declareRoute(function UpdateCategory() {
  useDocumentTitle(trans('pages.profileForm.update.documentTitle'));
  const { profile } = useAuthContext();
  const notFoundHandler = useNotFoundHandler();

  const query = useQuery<FindProfileQueryResponse>(FindUserQuery, {
    variables: { uid: profile?.uid },
    context: {
      // On GraphQL Not Found error, show a Not Found page
      onNotFound: notFoundHandler,
    },
  });


  const [mutate, mutationState] = useMutation<MutationResponse>(UpdateProfileMutation);

  const mappedErrors = useMemo(() => {
    const error = mutationState.error;

    return {
      __root: error ? trans('pages.profile.error') : undefined,
      ...(error ? errorsByPath(error.graphQLErrors as AppGraphQLError[]) : {}),
    };
  }, [mutationState.error]);

  async function submit(payload: ProfileData) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    mutate({
      variables: { uid: profile?.uid, payload },
    }).catch(onMutateError);
  }

  if (query.error) {
    throw new UnexpectedError(query.error.message, query.error);
  }

  if (query.loading) {
    // TODO: better loading state, with a dedicated skeleton or generic loader?
    return <p>{trans('common.loading')}</p>;
  }

  const profile_update = query.data!.User.me;

  return <Container px="md">
    {mutationState.called && mutationState.data?.User && <Alert title="Success" variant="success">
        {trans('pages.profile.successMessage')}
    </Alert>}

    <ProfileForm onSubmit={submit} errors={mappedErrors} initialData={profile_update} />

  </Container>;
}, PROFILE_UPDATE_PATH );

export default Page;

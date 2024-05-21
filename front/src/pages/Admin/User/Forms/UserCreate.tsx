import { declareAdminRoute } from "@app/router/router";
import { trans } from "@app/translations";
import { Container} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { useMemo } from "react";
import { useMutation } from '@app/api/apollo/useMutation';
import CreateUserMutation from '@graphql/mutation/user/CreateUser.graphql';
import { useNavigate } from "react-router-dom";
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes.ts';
import usePreviousUrlFromLocation from '@app/hooks/usePreviousUrlLocationState.tsx';
import { route } from '@app/router/generator.ts';
import { onMutateError } from '@graphql/utils.ts';
import { USER_CREATE_PATH } from '@app/paths.ts';
import { onCreatedUser } from '@graphql/store/users.ts';
import UserForm, { UserData } from '@app/components/User/UserForm.tsx';
import UserUpdate from '@app/pages/Admin/User/Forms/UserUpdate.tsx';

interface MutationResponse {
  User: {
    create: {
      uid: string
    }
  }
}

const UserCreatePage = declareAdminRoute(function UserCreate() {
  useDocumentTitle(trans('pages.admin.user.create.documentTitle'));
  const { previousUrl } = usePreviousUrlFromLocation();

  const navigate=useNavigate()
  const [mutate, { error }] = useMutation<MutationResponse>(CreateUserMutation, {
    update(cache, { data }) {
      onCreatedUser(cache, data!.User.create);
    },
  });

  const mappedErrors = useMemo(() => ({
    __root: error ? trans('pages.fatalError.form') : undefined,
    ...(error ? errorsByPath(error.graphQLErrors as AppGraphQLError[]) : {}),
  }), [error]);

  async function submit(payload: UserData) {
    mutate({
      variables: { payload },
    }).then((response) => {
      navigate(route(UserUpdate, { id: response.data!.User.create.uid }), {
        state: {
          userCreated: true,
          previousUrl,
        },
      });
    }).catch(onMutateError);
  }
  return <Container px="md">
    <UserForm onSubmit={submit} errors={mappedErrors}/>
  </Container>;
}, USER_CREATE_PATH);

export default UserCreatePage;

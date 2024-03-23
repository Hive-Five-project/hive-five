import { FormEvent, useEffect, useState } from 'react';
import { declareRoute } from '@app/router/router';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { trans } from '@app/translations';
import { route } from '@app/router/generator';
import Login from '@app/pages/Auth/Login';
import { useMutation } from '@app/api/apollo/useMutation';
import ForgotPasswordMutation from '@graphql/mutation/user/ForgotPassword.graphql';
import {
  Button,
  Alert,
  Container,
  Stack,
} from '@mantine/core';
import { FORGOT_PASSWORD_PATH } from '@app/paths';
import CompactTextInput from '@app/components/UI/CompactInput/CompactTextInput';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordConfirmation from './ForgotPasswordConfirmation';

export interface MutationResponse {
  User: {
    forgotPassword: boolean
  }
}

/**
 * Forgot password page, allowing a user to enter their email and receive a mail to reset their password.
 */
const ForgotPassword = declareRoute(function Page() {
  useDocumentTitle(trans('pages.forgotPassword.documentTitle'));

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [forgotPassword, forgotPasswordState] = useMutation<MutationResponse>(ForgotPasswordMutation);

  const hasError =
    !forgotPasswordState.loading &&
    forgotPasswordState.called &&
    (forgotPasswordState.error || !forgotPasswordState.data?.User?.forgotPassword)
  ;
  const hasSuccess = forgotPasswordState.called && forgotPasswordState.data?.User.forgotPassword;

  useEffect(() => {
    if (hasSuccess) {
      navigate(route(ForgotPasswordConfirmation), {
        state: {
          email,
        },
      });
    }
  }, [navigate, hasSuccess, email]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void forgotPassword({ variables: { email } });
  }

  return <Container px="md">
    <form id="forgot-password" onSubmit={onSubmit}>
      <h2>{trans('pages.forgotPassword.documentTitle')}</h2>
      <Stack>
        {hasError &&
          <Alert
            title={trans('common.error')}
            variant="outline"
            color="red"
          ></Alert>
        }
        <div>{trans('pages.forgotPassword.content')}</div>
        <CompactTextInput
          id="email"
          label={trans('pages.login.inputEmail')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          autoComplete="email"
        />
        <Button
          type="submit"
          loading={forgotPasswordState.loading}
        >
          {trans('common.actions.send')}
        </Button>
        <Button
          component="a"
          href={route(Login)}
          variant="outline"
        >
          {trans('pages.forgotPassword.goBack')}
        </Button>
      </Stack>
    </form>
  </Container>; 
}, FORGOT_PASSWORD_PATH);

export default ForgotPassword;

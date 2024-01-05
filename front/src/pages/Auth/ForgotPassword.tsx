import { FormEvent, useState } from 'react';
import { declareRoute } from '@app/router/router';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { trans } from '@app/translations';
import { route } from '@app/router/generator';
import Login from '@app/pages/Auth/Login';
import { useMutation } from '@app/api/apollo/useMutation';
import ForgotPasswordMutation from '@graphql/mutation/user/ForgotPassword.graphql';
import { Button, TextInput, Alert } from '@mantine/core';

interface MutationResponse {
  User: {
    forgotPassword: boolean
  }
}

/**
 * Forgot password page, allowing a user to enter their email and receive a mail to reset their password.
 */
const ForgotPassword = declareRoute(function Page() {
  useDocumentTitle(trans('pages.forgotPassword.documentTitle'));

  const [username, setUsername] = useState<string>('');
  const [forgotPassword, forgotPasswordState] = useMutation<MutationResponse>(ForgotPasswordMutation);

  const hasError =
    !forgotPasswordState.loading &&
    forgotPasswordState.called &&
    (forgotPasswordState.error || !forgotPasswordState.data?.User?.forgotPassword)
  ;
  const hasSuccess = forgotPasswordState.called && forgotPasswordState.data?.User.forgotPassword;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void forgotPassword({ variables: { email: username } });
  }

  return <div style={
    {
      width: '100%',
      height: '100%',
    }
  }>
    <h2>{trans('pages.forgotPassword.documentTitle')}</h2>

    {hasSuccess && <Alert color="success">
      Un email vous a été envoyé pour réinitialiser votre mot de passe.
    </Alert>}

    {hasError && <Alert color="error">
      Une erreur est survenue.
    </Alert>}

    <form id="forgot-password" onSubmit={onSubmit}>
      <TextInput
        id="username"
        label="Identifiant"
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoFocus
        autoComplete="username"
        placeholder="Votre email"
      />
      <div style={
        {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
        }
      }>
        <Button
          component="a"
          href={route(Login)}
        >
          Retour à l&apos;identification
        </Button>
        <Button
          type="submit"
          disabled={forgotPasswordState.loading}
        >
          Envoyer un email
        </Button>
      </div>
    </form>
  </div>;
}, '/forgot-password');

export default ForgotPassword;

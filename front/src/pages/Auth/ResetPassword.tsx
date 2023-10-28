import { FormEvent, useMemo, useState } from 'react';
import { declareRoute } from '@app/router/router';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { trans } from '@app/translations';
import { route } from '@app/router/generator';
import Login from '@app/pages/Auth/Login';
import { useMutation } from '@app/api/apollo/useMutation';
import ResetPasswordMutation from '@graphql/mutation/user/ResetPassword.graphql';
import Link from '@app/components/Router/Link';
import { useParams } from 'react-router-dom';
import { errorsByPath } from '@app/api/errors';
import { AppGraphQLError, GraphQLErrorCodes } from '@app/api/errors/GraphQLErrorCodes';
import { FormErrorsMap } from '@app/components/UI/Form';
import { MutationResult } from '@apollo/client';
import { Alert, Button, TextField } from '@mui/material';
import { FormUtils } from '@app/components/UI/Form/index';

interface MutationResponse {
  User: {
    resetPassword: boolean
  }
}

/**
 * After a user has requested a password reset, they are redirected to this page with a token.
 * The user can then enter a new password if the token is still valid.
 */
const ResetPassword = declareRoute(function Page() {
  useDocumentTitle(trans('pages.resetPassword.documentTitle'));

  const { token } = useParams();
  const [password, setPassword] = useState<string | null>(null);
  const [passwordConfirm, setPasswordConfirm] = useState<string | null>(null);
  const [resetPassword, resetPasswordState] = useMutation<MutationResponse>(ResetPasswordMutation);

  const hasSuccess = resetPasswordState.called && resetPasswordState.data?.User.resetPassword;

  function extractRootErrors({ error, data } : MutationResult<MutationResponse>) {
    console.info({ error });

    const defaultErrorMessage = 'Une erreur est survenue.';

    if (data?.User?.resetPassword === false) {
      return defaultErrorMessage;
    }

    if (!error) {
      return undefined;
    }

    // if we have a custom error message, display it:
    if ((error.graphQLErrors as AppGraphQLError[])?.[0]?.code === GraphQLErrorCodes.CUSTOM_USER_ERROR) {
      return error.graphQLErrors[0]?.message ?? defaultErrorMessage;
    }

    return defaultErrorMessage;
  }

  const mappedErrors: FormErrorsMap<'newPassword' | 'newPasswordConfirm'> = useMemo(() => {
    const errors = resetPasswordState.error;

    return ({
      __root: extractRootErrors(resetPasswordState),
      ...(errors ? errorsByPath(errors.graphQLErrors as AppGraphQLError[]) : {}),
    });
  }, [resetPasswordState]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetPassword({
      variables: {
        token,
        payload: {
          newPassword: password,
          newPasswordConfirm: passwordConfirm,
        },
      },
    });
  }

  return <div>
    <h2>{trans('pages.resetPassword.documentTitle')}</h2>

    {hasSuccess && <Alert color="success">
      Votre mot de passe a été réinitialisé.

      Vous pouvez à présent <Link to={route(Login)}>vous connecter</Link>.
    </Alert>}


    {FormUtils.arrayify(mappedErrors.__root).map((error, i) => <Alert key={i} color="error">{error}</Alert>)}

    <form id="forgot-password" onSubmit={onSubmit}>

      <TextField
        id="new-password"
        label="Nouveau mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={hasSuccess}
        InputProps={{
          autoFocus: true,
          autoComplete: 'new-password',
        }}
        error={!!mappedErrors.newPassword}
      />
      <TextField
        id="new-password-confirm"
        label="Confirmer le nouveau mot de passe"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
        disabled={hasSuccess}
        InputProps={{
          autoComplete: 'new-password',
        }}
        error={!!mappedErrors.newPasswordConfirm}
      />

      <div>
        <Button href={route(Login)}>Retour à l&apos;identification</Button>
        <Button
          type="submit"
          color="primary"
          disabled={resetPasswordState.loading || hasSuccess}
        >
          Changer le mot de passe
        </Button>
      </div>
    </form>
  </div>;
}, '/reset-password/:token');

export default ResetPassword;

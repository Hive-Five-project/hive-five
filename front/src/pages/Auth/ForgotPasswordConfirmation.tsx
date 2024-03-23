import { MouseEvent } from 'react';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { FORGOT_PASSWORD_CONFIRMATION_PATH } from '@app/paths';
import { route } from '@app/router/generator';
import { declareRoute } from '@app/router/router';
import { trans } from '@app/translations';
import { Alert, Button, Container, Loader, Stack } from '@mantine/core';
import Login from './Login';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@app/api/apollo/useMutation';
import ForgotPasswordMutation from '@graphql/mutation/user/ForgotPassword.graphql';
import { MutationResponse } from './ForgotPassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface ForgotPasswordEmailState {
  email?: string | null
}

const ForgotPasswordConfirmation = declareRoute(function Page() {
  useDocumentTitle(trans('pages.forgotPasswordConfirmation.documentTitle'));

  const { state } = useLocation();

  const [forgotPassword, forgotPasswordState] = useMutation<MutationResponse>(ForgotPasswordMutation);

  const hasSuccess = forgotPasswordState.called && forgotPasswordState.data?.User.forgotPassword;

  const hasError =
    !forgotPasswordState.loading &&
    forgotPasswordState.called &&
    (forgotPasswordState.error || !forgotPasswordState.data?.User?.forgotPassword)
  ;

  function onSubmit(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    void forgotPassword({ variables: { email: (state as ForgotPasswordEmailState)?.email } });
  }

  return <Container px="md">
    <h2>{trans('pages.forgotPasswordConfirmation.title')}</h2>
    <Stack>
      {hasError &&
        <Alert
          title={trans('common.error')}
          variant="outline"
          color="red"
        ></Alert>
      }
      <div>{trans('pages.forgotPasswordConfirmation.content')}</div>
      <div>
        {trans('pages.forgotPasswordConfirmation.noEmail')}&nbsp;
        <a href="" onClick={onSubmit}>
          {trans('pages.forgotPasswordConfirmation.resendEmail')}
        </a>&nbsp;
        {forgotPasswordState.loading &&
          <Loader size="xs" />
        }
        {hasSuccess &&
          <FontAwesomeIcon icon={faCheck} />
        }
      </div>
      <Button
        component="a"
        href={route(Login)}
      >
        {trans('pages.forgotPasswordConfirmation.goBack')}
      </Button>
    </Stack>
  </Container>;
}, FORGOT_PASSWORD_CONFIRMATION_PATH);

export default ForgotPasswordConfirmation;

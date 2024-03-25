import { FormErrors, FormUtils } from '@app/components/UI/Form/index';
import { ComponentProps } from 'react';
import Alert from '@app/pages/Error/Alert.tsx';

interface Props extends ComponentProps<'div'>{
  errors?: FormErrors
  field?: string
  title?: string
}

/**
 * Display root (global, unmapped, unattached to a field) errors in a form.
 */
export function FormRootErrors({
  errors,
  field,
  title = 'Erreur',
  ...remainingProps
}: Props) {
  const errorsArray = FormUtils.arrayify(errors);

  if (errorsArray.length === 0) {
    return null;
  }

  return <Alert title={title} variant="danger" {...remainingProps}>
    <p>
      {field && <strong>{field === '__root' ? '' : field}<br /></strong>}
      {errorsArray.map((error, index) => <span key={index}>
        {error}<br />
      </span>)}
    </p>
  </Alert>;
}

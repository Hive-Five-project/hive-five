import clsx from 'clsx';
import LabelHint from '@app/components/UI/Form/LabelHint';
import { RequiredHint } from '@app/components/UI/Form/RequiredHint';
import { PropsWithChildren } from 'react';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement>{
  label: string
  htmlFor: string
  hint?: string
  required?: boolean
}

export function Label({
  label,
  htmlFor,
  hint,
  required = false,
  children,
  ...LabelProps
}: PropsWithChildren<Props>) {
  return <label
    className={clsx('label', {
      'label--required': required,
    })}
    htmlFor={htmlFor}
    {...LabelProps}
  >
    {children}
    {label}
    <RequiredHint required={required} />

    <LabelHint hint={hint} />
  </label>;
}

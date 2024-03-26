import clsx from 'clsx';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
  type: 'input' | 'select'
  hasError?: boolean
  disabled?: boolean
}

export default function FormControl({
  type,
  hasError = false,
  disabled = false,
  children,
  ...remainingProps
}: Props) {
  return <div
    className={clsx(`form-control ${type}-control`, {
      [`${type}-control--error`]: hasError,
      [`${type}-control--disabled`]: disabled,
    },
    [
      'flex',
      'flex-col',
      'flex-1',
      'mb-5',
    ])}
    {...remainingProps}
  >
    {children}
  </div>;
}

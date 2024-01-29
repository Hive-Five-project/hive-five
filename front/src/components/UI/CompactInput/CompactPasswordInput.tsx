import { PasswordInput } from '@mantine/core';
import type { PasswordInputProps } from '@mantine/core';
import classes from '@app/styles/CompactInput/CompactInput.module.scss';

interface CompactPasswordInputProps extends PasswordInputProps {
}

export default function CompactPasswordInput({ ...others }: CompactPasswordInputProps) {
  const classList: string[] = [];
  if (others.leftSection)
    classList.push(classes['has-left-section'])
  if (!others.placeholder && !others.value)
    classList.push(classes['no-value'])

  return (
    <PasswordInput
      radius="sm"
      variant="filled"
      size="sm"
      value={others.value}
      classNames={{
        root: classes.root + ' ' + classList.join(' '),
        label: classes.label,
        input: classes.input,
      }}
      {...others}
    />
  );
}

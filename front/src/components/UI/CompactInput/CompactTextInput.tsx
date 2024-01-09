import { TextInput } from '@mantine/core';
import type { TextInputProps } from '@mantine/core';
import classes from '@app/styles/CompactInput/CompactInput.module.scss';

interface CompactTextInputProps extends TextInputProps {
}

export default function CompactTextInput({ ...others }: CompactTextInputProps) {
  const classList: string[] = [];
  if (others.leftSection)
    classList.push(classes['has-left-section'])
  if (!others.placeholder && !others.value)
    classList.push(classes['no-value'])

  return (
    <TextInput
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

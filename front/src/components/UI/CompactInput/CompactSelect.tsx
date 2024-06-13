import { Select } from '@mantine/core';
import type { SelectProps } from '@mantine/core';
import classes from '@app/styles/CompactInput/CompactInput.module.scss';

interface CompactSelectProps extends SelectProps {
}

export default function CompactSelect({ ...others }: CompactSelectProps) {
  const classList: string[] = [];
  if (others.leftSection)
    classList.push(classes['has-left-section'])
  if (!others.placeholder && !others.value)
    classList.push(classes['no-value'])

  return (
    <Select
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

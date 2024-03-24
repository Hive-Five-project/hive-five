import { HTMLAttributes } from 'react';
import { Box } from '@mantine/core';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  hint?: string
}

export default function LabelHint({ hint }: Props) {
  if (!hint) {
    return null;
  }

  return <Box >
    {hint}
  </Box>;
}

import { Box } from '@mantine/core';

interface Props {
  required?: boolean
}

export function RequiredHint({ required = false }: Props) {
  if (!required) {
    return null;
  }

  return <Box>
    <span className="sr-only">Champ obligatoire</span>
  </Box>;
}


import { PropsWithChildren } from 'react';
import { Container } from '@mantine/core';
import { Alert as MantineAlert} from '@mantine/core';


interface Props {
  title: string
  variant?:  "success" | "info" | "warning" | "danger" | undefined
  size?: 'small' | 'medium'
}

export default function Alert({
  title,
  variant = 'info',
  size = 'medium',
  children,
}: PropsWithChildren<Props>) {
  const color =
    variant === 'info' ? 'blue' :
      variant === 'warning' ? 'yellow' :
        variant === 'danger' ? 'red' :
          variant === 'success' ? 'green' : 'gray';

  return (
    <Container size={size} p={10}>
      <MantineAlert title={title} color={color}>
        {children}
      </MantineAlert>
    </Container>
  );
}

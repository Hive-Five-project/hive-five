import { PropsWithChildren } from 'react';
import NeedsLogin from '@app/guards/NeedsLogin.tsx';

/**
 * Checks authentication and redirects to login page if not authenticated and check authorization access.
 */
export default function NeedsAdmin({ children }: PropsWithChildren) {
  return <NeedsLogin checkIsAdmin>{children}</NeedsLogin>;
}

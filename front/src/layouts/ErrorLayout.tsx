import { PropsWithChildren } from 'react';
import AppLayout from '@app/layouts/AppLayout';

export default function ErrorLayout({ children }: PropsWithChildren) {
  return <AppLayout>
    {children}
  </AppLayout>;
}

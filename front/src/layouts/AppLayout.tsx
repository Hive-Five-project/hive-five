import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  return <>
    {/* todo: add header */}
    <main>
      {children}
    </main>
    {/* todo: add footer */}
  </>;
}

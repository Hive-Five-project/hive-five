import { PropsWithChildren } from 'react';
import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import Header from '@app/components/UI/Header/Header.tsx';

export default function AppLayout({ children }: PropsWithChildren) {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{
        height: 61,
        collapsed: !pinned,
        offset: false,
      }}
      padding="md"
    >
      <Header />

      <AppShell.Main style={{ paddingTop: 61 }}>
        {children}
      </AppShell.Main>

      {/* todo: add footer */}
    </AppShell>
  );
}

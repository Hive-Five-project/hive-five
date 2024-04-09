import { PropsWithChildren } from 'react';
import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import Header from '@app/components/UI/Header/Header.tsx';

/**
 * Blank layout for the most simple pages (login, logout, transitions, …)
 */
export default function BlankLayout({ children }: PropsWithChildren) {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{
        height: 61,
        collapsed: !pinned,
      }}
    >
      <Header />

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

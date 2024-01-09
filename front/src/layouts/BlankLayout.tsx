import { PropsWithChildren } from 'react';
import { AppShell, Group, Burger, Box } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import Link from '@app/components/Router/Link';
import LogoPlain from '@app/assets/LogoPlain';
import LogoPlainWithText from '@app/assets/LogoPlainWithText';

/**
 * Blank layout for the most simple pages (login, logout, transitions, …)
 */
export default function BlankLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 120 });
  
  return (
    <AppShell
      header={{
        height: 61,
        collapsed: !pinned,
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="10px" py="5px">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="md"
          />
          <Link to="/">
            <Group gap="xs">
              <Box hiddenFrom="sm">
                <LogoPlain style={{ width: 50, height: 50 }} />
              </Box>
              <Box visibleFrom="sm">
                <LogoPlainWithText style={{ height: 50 }} />
              </Box>
            </Group>
          </Link>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

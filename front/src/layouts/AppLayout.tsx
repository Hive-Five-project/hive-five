import { PropsWithChildren } from 'react';
import { AppShell, Group, Avatar, Burger, Box } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { PROFILE_PATH } from '@app/paths';
import Link from '@app/components/Router/Link';
import LogoPlain from '@app/assets/LogoPlain';
import LogoPlainWithText from '@app/assets/LogoPlainWithText';
import DefaultProfileIcon from '@app/assets/DefaultProfileIcon';

export default function AppLayout({ children }: PropsWithChildren) {
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
          <Avatar
            component={Link}
            to={PROFILE_PATH}
            src={null}
            alt="Profile"
            variant="transparent"
            size="40px"
          >
            <DefaultProfileIcon />
          </Avatar>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {children}
      </AppShell.Main>

      {/* todo: add footer */}
    </AppShell>
  );
}

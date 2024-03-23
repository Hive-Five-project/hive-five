import { AppShell, Avatar, Box, Burger, Drawer, Group, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PROFILE_PATH } from '@app/paths';
import Link from '@app/components/Router/Link';
import LogoPlain from '@app/assets/LogoPlain';
import LogoPlainWithText from '@app/assets/LogoPlainWithText';
import DefaultProfileIcon from '@app/assets/DefaultProfileIcon';
import { useAuthContext } from '@app/hooks/useAuthContext.tsx';
import { useState } from 'react';

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  const [openedMenu, setOpenedMenu] = useState(false);

  const { authenticated } = useAuthContext();

  return (
    <AppShell.Header>
      <Drawer opened={opened} onClose={toggle} padding="md" size="xs">
        <ul>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </Drawer>
      <Group justify="space-between" h="100%" px="10px" py="5px">
        {authenticated && <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="md"
        />
        }

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
        {authenticated &&
          <Menu shadow="md" width={200} opened={openedMenu} onChange={setOpenedMenu}>
            <Menu.Target>
              <Avatar
                component="div"
                alt="Profile"
                variant="transparent"
                size="40px"
              >
                <DefaultProfileIcon />
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <Link to={PROFILE_PATH}>Profile</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/logout">Logout</Link>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        }
      </Group>
    </AppShell.Header>
  )
  ;
}

import { AppShell, Avatar, Box, Burger, Drawer, Group, Menu, NavLink, Overlay } from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { PROFILE_PATH } from '@app/paths';
import Link from '@app/components/Router/Link';
import LogoPlain from '@app/assets/LogoPlain';
import LogoPlainWithText from '@app/assets/LogoPlainWithText';
import DefaultProfileIcon from '@app/assets/DefaultProfileIcon';
import { useAuthContext } from '@app/hooks/useAuthContext.tsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { route } from '@app/router/generator.ts';
import ListUsers from '@app/pages/Admin/User/ListUsers/ListUsers.tsx';
import { trans } from '@app/translations';

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  const [openedMenu, setOpenedMenu] = useState(false);

  const { authenticated, isAdmin } = useAuthContext();
  const { hovered, ref } = useHover();

  return (
    <AppShell.Header>
      <Drawer opened={opened} onClose={toggle} size="xs">
        <Box>
          <NavLink
            leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}
            label="Logout"
            component={Link}
            to="/logout"
            style={{ borderRadius: "var(--mantine-radius-md)" }}
          />
        </Box>
      </Drawer>
      <Group justify="space-between" h="100%" px="10px" py="5px">
        {authenticated && <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="md"
        />}

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
                ref={ref}
                component="div"
                alt="Profile"
                variant="transparent"
                size="40px"
                style={{ cursor: 'pointer' }}
              >
                {hovered && <Overlay zIndex={1} opacity={0.1} />}
                <DefaultProfileIcon />
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<FontAwesomeIcon icon={faUser} />}
                component={Link}
                to={PROFILE_PATH}
              >
                {trans('pages.user.profile.documentTitle')}
              </Menu.Item>
              {isAdmin && <Menu.Item
                leftSection={<FontAwesomeIcon icon={faUsers} />}
                component={Link}
                to={route(ListUsers)}
                color="green"
              >
                {trans('pages.admin.user.list.documentTitle')}
              </Menu.Item>}
              <Menu.Item
                leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}
                component={Link}
                to="/logout"
                color="red"
              >
                {trans('pages.logout.disconnect')}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        }
      </Group>
    </AppShell.Header>
  );
}

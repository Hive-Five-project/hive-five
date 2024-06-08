import { AppShell, Avatar, Box, Burger, Divider, Drawer, Group, Menu, NavLink, Overlay, Title, Text, Button } from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { ABOUT, APIARY_LIST_PATH, LOGIN_PATH, PROFILE_PATH, SHOPPING_CART } from '@app/paths';
import Link from '@app/components/Router/Link';
import LogoPlainWithText from '@app/assets/LogoPlainWithText';
import LogoPlain from '@app/assets/LogoPlain';
import DefaultProfileIcon from '@app/assets/DefaultProfileIcon';
import { useAuthContext } from '@app/hooks/useAuthContext.tsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser, faUsers, faCartShopping, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { trans } from '@app/translations';
import BeehiveGroupIcon from '@app/assets/BeehiveGroupIcon';
import { route } from '@app/router/generator.ts';
import ListUsers from '@app/pages/Admin/User/ListUsers/ListUsers.tsx';

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  const [openedMenu, setOpenedMenu] = useState(false);

  const { authenticated, isAdmin } = useAuthContext();
  const { hovered, ref } = useHover();
  const [active, setActive] = useState(0);

  //We can add links to the burger menu dynamically(can be done in dependant component)
  const navlinks = [
    { icon: <BeehiveGroupIcon style={{ width: "20px" }} />, label: trans('navigation.apiaries'), to: APIARY_LIST_PATH },
    { icon: <FontAwesomeIcon icon={faCartShopping} />, label: trans('navigation.cart'), to: SHOPPING_CART },
    { icon: <FontAwesomeIcon icon={faCircleInfo} />, label: trans('navigation.about'), to: ABOUT },
  ];

  const items = navlinks.map((item, index) => (
    <NavLink
      component={Link}
      to={item.to}
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={item.icon}
      onClick={() => setActive(index)}
      color="green"
      style={{ borderRadius: '20px' }}

    />
  ));

  return (
    <AppShell.Header>
      <Drawer
        opened={opened}
        onClose={toggle}
        style={{ position: "fixed" }}
        size={window.innerWidth <= 768 ? "70%" : "20%"}
      >
        <Box style={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }} >
          {items}
          <Divider />
          <NavLink
            leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}
            label={trans('navigation.logout')}
            component={Link}
            to="/logout"
            style={{ borderRadius: "var(--mantine-radius-md)", color: 'red' }}
          />
        </Box>
      </Drawer>
      <Group justify="space-between" h="100%" px="10px" py="5px" >
        <Group gap="xs">
          {authenticated && <Burger
            opened={opened}
            onClick={toggle}
            size="md"
          />} <Link to="/">

            <Box >
              <LogoPlainWithText style={{ height: 50 }} />
            </Box>
          </Link>
      </Group>

        {authenticated &&
          <Menu shadow="md" width={150} opened={openedMenu} onChange={setOpenedMenu}  >
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
                {trans('navigation.profile')}
              </Menu.Item>
              <Menu.Item
                leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}
                component={Link}
                to="/logout"
                color="red"
              >
                {trans('navigation.logout')}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        }
        {!authenticated && 
        <Button
        component={Link}
        to={LOGIN_PATH}
        size="md"
        style={{padding: '10px',marginRight: '10px',marginBottom: '5px'}}
        >
          {trans('pages.login.connect')}
        </Button>}
      </Group>
    </AppShell.Header>
  )
  ;
}

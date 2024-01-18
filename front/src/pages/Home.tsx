import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { declareRoute } from '@app/router/router';
import { route } from '@app/router/generator';
import { useDocumentTitle } from '@mantine/hooks';
import { Button, Container, Text, Box } from '@mantine/core';
import { useAuthContext } from '@app/hooks/useAuthContext';
import LogoWithTextCompact from '@app/assets/LogoWithTextCompact';
import ApiaryList from './Apiary/ApiaryList';

export default declareRoute(function Home() {
  useDocumentTitle('HiveFive');

  const { pathname } = useLocation();
  const { authenticated } = useAuthContext();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (authenticated) {
      navigate(route(ApiaryList), {
        state: {
          target: pathname,
        },
      });
    }
  }, [authenticated, navigate, pathname]);

  return <>
    <Container fluid bg="green" c="white" ta="center" pb="80px" pt="80px">
      <Container p="md">
        <Box px="xl">
          <LogoWithTextCompact style={{ height: 150, fill: "var(--mantine-color-white)" }} />
        </Box>
        <Text size="xl" pb="md">Votre suivi de ruches et ruchers</Text>
        <Button
          component="a"
          href="/login"
          color="yellow"
          size="lg"
          fullWidth
        >
          Se connecter
        </Button>
      </Container>
    </Container>
    <Container fluid p={0} bg="green" style={{ height: 40 }}>
      <svg width="100%" height="100%" viewBox="0 0 390 39" fill="none" preserveAspectRatio="none">
        <path d="M0 39C0 39 63.8452 0 195.99 0C328.135 0 390 39 390 39H0Z" fill="#FCF5E2"/>
      </svg>
    </Container>
  </>;
}, '/');

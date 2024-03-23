import { APIARY_LIST_PATH, APIARY_ROOT_PATH } from '@app/paths';
import { declareRoute } from '@app/router/router';
import { trans } from '@app/translations';
import { Container, Title, SimpleGrid, Paper, Box, Center } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useQuery } from '@apollo/client';
import ListApiariesQuery from '@graphql/query/apiary/ListApiaries.graphql';
import ListCard from '@app/components/UI/List/ListCard';
import { Apiary } from '@app/models/types/Apiary';
import ListCardLoading from '@app/components/UI/List/ListCardLoading';
import BeeHiveGroupIcon from '@app/assets/BeeHiveGroupIcon';

import classes from '@app/styles/List/Card.module.scss';
import { Link } from 'react-router-dom';
import AddApiaryIcon from '@app/assets/AddApiaryIcon';
import { route } from '@app/router/generator';
import ApiaryCreate from './Forms/ApiaryCreate.tsx';

interface Response {
  Apiary: {
    listMyApiaries: Apiary[]
  }
}

export default declareRoute(function ApiaryList() {
  useDocumentTitle(trans('pages.apiaryList.documentTitle'));

  const { loading, error, data } = useQuery<Response>(ListApiariesQuery);

  const renderCards = () => {
    if (loading) {
      return [...Array(4)].map((_, i) => <ListCardLoading key={i} />);
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    return data?.Apiary.listMyApiaries.map((apiary) =>
      <ListCard
        key={apiary.uid}
        title={apiary.name}
        path={`${APIARY_ROOT_PATH}/update/${apiary.uid}`}
        icon={<BeeHiveGroupIcon />}
      />);//todo: should change to a new page.
  };
  const renderButton = () => {
    if (loading) {
      return <ListCardLoading key={1} />;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    return <Paper
      component={Link}
      to={route(ApiaryCreate)}
      px="md"
      className={classes.card}
      c="green"
      bg="var(--mantine-color-yellow-0)"
      ta="center"
    >
      <Center>
        <Box p={{ base: "sm", xs: "lg" }}  >
          <AddApiaryIcon />
        </Box>
      </Center>
      <Title className={classes.title} py="xs" order={2}>{trans('pages.apiaryList.addButtonText')}</Title>
    </Paper>
  };

  return <Container px="md">
    <Title order={2} pb="sm">{trans('pages.apiaryList.documentTitle')}</Title>
    <SimpleGrid
      cols={{ base: 2, md: 3 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      {renderCards()}
      {renderButton()}

    </SimpleGrid>
  </Container>;
}, APIARY_LIST_PATH);

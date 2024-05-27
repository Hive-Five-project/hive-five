import { APIARY_HOME_PATH } from '@app/paths';
import { declareRoute } from '@app/router/router';
import { trans } from '@app/translations';
import { Container, SimpleGrid, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useNotFoundHandler } from '@app/components/ErrorBoundary.tsx';
import { useDocumentTitle } from '@mantine/hooks';
import { useQuery } from '@apollo/client';
import FindApiaryQuery from '@graphql/query/apiary/FindApiary.graphql';
import ListBeehivesQuery from '@graphql/query/beehive/ListBeehives.graphql';
import ListCard from '@app/components/UI/List/ListCard';
import { Beehive } from '@app/models/types/Beehive';
import { Apiary } from '@app/models/types/Apiary.ts';
import ListCardLoading from '@app/components/UI/List/ListCardLoading';
import AddIcon from '@app/assets/AddIcon.tsx';
import BeehiveIcon from '@app/assets/BeehiveIcon';
import { route } from '@app/router/generator';
import BeehiveHome from '@app/pages/Beehive/BeehiveHome.tsx';
import { faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import ApiaryUpdate from '@app/pages/Apiary/Forms/ApiaryUpdate.tsx';
import ApiaryList from '@app/pages/Apiary/ApiaryList.tsx';
import TopNavigationMenu from '@app/components/UI/TopNavigation/TopNavigationMenu';

interface FindApiaryQueryResponse {
  Apiary: {
    find: Apiary
  }
}

interface ListBeehivesQueryResponse {
  Beehive: {
    listBeehivesFromApiary: Beehive[]
  }
}

const Page = declareRoute(function ApiaryHome() {
  useDocumentTitle(trans('pages.apiaryHome.documentTitle'));

  const { uid } = useParams();
  const notFoundHandler = useNotFoundHandler();

  const queryFindApiary = useQuery<FindApiaryQueryResponse>(FindApiaryQuery, {
    variables: { uid },
    context: {
      // On GraphQL Not Found error, show a Not Found page
      onNotFound: notFoundHandler,
    },
  });

  const queryListBeehives = useQuery<ListBeehivesQueryResponse>(ListBeehivesQuery, {
    variables: { apiaryUid: uid },
    context: {
      onNotFound: notFoundHandler,
    },
  });

  const renderCards = () => {
    if (queryFindApiary.loading || queryListBeehives.loading) {
      return [...Array(4)].map((_, i) => <ListCardLoading key={i} />);
    }

    if (queryFindApiary.error || queryListBeehives.error) {
      const error = (queryFindApiary.error || queryListBeehives.error)?.message
        ?? "Unexpected error";
      return <p>{error}</p>;
    }

    return <>
      {queryListBeehives.data?.Beehive.listBeehivesFromApiary.map((beehive) =>
        <ListCard
          key={beehive.uid}
          title={beehive.name}
          path={route(BeehiveHome, { uid: beehive.uid })}
          icon={<BeehiveIcon />}
        />,
      )}
    </>;
  };
  const renderButton = () => {
    if (queryFindApiary.loading || queryListBeehives.loading) {
      return <ListCardLoading key={1} />;
    }

    if (queryFindApiary.error || queryListBeehives.error) {
      const error = (queryFindApiary.error || queryListBeehives.error)?.message
        ?? "Unexpected error";
      return <p>{error}</p>;
    }

    return <ListCard
      title={trans('pages.apiaryHome.addButtonText')}
      path="#" //TODO : Add create beehive link
      icon={<AddIcon />}
      colorInverted
    />;
  };

  const apiary = queryFindApiary.data?.Apiary.find;

  const parseDate = (date: string | null | undefined) => {
    return date ? new Date(date).toLocaleDateString() : "-";
  }

  return <Container px="md">
    <TopNavigationMenu
      previousPath={route(ApiaryList)}
      buttons={[
        {
          text: trans('common.actions.edit'),
          icon: faWrench,
          path: route(ApiaryUpdate, { uid }),
        },
        {
          text: trans('common.actions.delete'),
          icon: faTrash,
          path: "#", //TODO : Add delete link
          color: "red",
        },
      ]}
    />
    <Container py="md" px={0}>
      <Text size="lg" fw={700}>{trans('pages.apiaryHome.name')}</Text>
      <Text pb="xs">{apiary?.name ?? "-"}</Text>
      <Text size="lg" fw={700}>{trans('pages.apiaryHome.address')}</Text>
      <Text pb="xs">{apiary?.address ?? "-"}</Text>
      <Text size="lg" fw={700}>{trans('pages.apiaryHome.createdAt')}</Text>
      <Text pb="xs">{parseDate(apiary?.createdAt)}</Text>
      <Text size="lg" fw={700}>{trans('pages.apiaryHome.updatedAt')}</Text>
      <Text pb="xs">{parseDate(apiary?.updatedAt)}</Text>
    </Container>
    <SimpleGrid
      cols={{ base: 2, md: 3 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      {renderCards()}
      {renderButton()}
    </SimpleGrid>
  </Container>;
}, APIARY_HOME_PATH);

export default Page;

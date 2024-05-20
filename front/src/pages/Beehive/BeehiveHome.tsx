import { BEEHIVE_HOME_PATH } from '@app/paths';
import { declareRoute } from '@app/router/router';
import { trans } from '@app/translations';
import { Container, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useNotFoundHandler } from '@app/components/ErrorBoundary.tsx';
import { useDocumentTitle } from '@mantine/hooks';
import { useQuery } from '@apollo/client';
import FindBeehiveQuery from '@graphql/query/beehive/FindBeehive.graphql';
import { Beehive } from '@app/models/types/Beehive';
import { route } from '@app/router/generator';
import { faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import ApiaryList from '@app/pages/Apiary/ApiaryList.tsx';
import ApiaryHome from '@app/pages/Apiary/ApiaryHome.tsx';
import TopNavigationMenu from '@app/components/UI/TopNavigation/TopNavigationMenu';

interface FindBeehiveQueryResponse {
  Beehive: {
    find: Beehive
  }
}

const Page = declareRoute(function BeehiveHome() {
  useDocumentTitle(trans('pages.beehiveHome.documentTitle'));

  const { uid } = useParams();
  const notFoundHandler = useNotFoundHandler();

  const queryFindBeehive = useQuery<FindBeehiveQueryResponse>(FindBeehiveQuery, {
    variables: { uid },
    context: {
      // On GraphQL Not Found error, show a Not Found page
      onNotFound: notFoundHandler,
    },
  });

  const beehive = queryFindBeehive.data?.Beehive.find;

  const parseDate = (date: string | null | undefined) => {
    return date ? new Date(date).toLocaleDateString() : "-";
  }

  return <Container px="md">
    <TopNavigationMenu
      previousPath={
        beehive?.apiary?.uid
          ? route(ApiaryHome, { uid: beehive?.apiary?.uid })
          : route(ApiaryList)
      }
      buttons={[
        {
          text: trans('common.actions.edit'),
          icon: faWrench,
          path: "#", //TODO : Add edit link
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
      <Text size="lg" fw={700}>{trans('pages.beehiveHome.name')}</Text>
      <Text pb="xs">{beehive?.name ?? "-"}</Text>
      <Text size="lg" fw={700}>{trans('pages.beehiveHome.bees')}</Text>
      <Text pb="xs">{beehive?.bee ?? "-"}</Text>
      <Text size="lg" fw={700}>{trans('pages.beehiveHome.createdAt')}</Text>
      <Text pb="xs">{parseDate(beehive?.createdAt)}</Text>
      <Text size="lg" fw={700}>{trans('pages.beehiveHome.updatedAt')}</Text>
      <Text pb="xs">{parseDate(beehive?.updatedAt)}</Text>
    </Container>
  </Container>;
}, BEEHIVE_HOME_PATH);

export default Page;

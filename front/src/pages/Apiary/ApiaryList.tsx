import { APIARY_LIST_PATH } from '@app/paths';
import { declareRoute } from '@app/router/router';
import { trans } from '@app/translations';
import { Container, Title, SimpleGrid, Skeleton } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useQuery } from '@apollo/client';
import ListApiariesQuery from '@graphql/query/apiary/ListApiaries.graphql';
import ApiaryCard from '@app/components/UI/Apiary/ApiaryCard';
import { Apiary } from '@app/models/types/Apiary';

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
      return [...Array(4)].map((_, i) => <Skeleton key={i} height={200} />);
    }
    
    if (error) {
      return <p>{error.message}</p>;
    }

    return data?.Apiary.listMyApiaries.map((apiary) =>
      <ApiaryCard key={apiary.uid} apiary={apiary} />);
  };

  return <Container px="md">
    <Title order={2}>{trans('pages.apiaryList.documentTitle')}</Title>
    <SimpleGrid
      cols={{ base: 2, md: 3 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      {renderCards()}
    </SimpleGrid>
  </Container>;
}, APIARY_LIST_PATH);

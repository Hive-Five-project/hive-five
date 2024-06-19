import { ApolloCache } from '@apollo/client';
import ListBeehivesQuery from '@graphql/query/beehive/ListBeehives.graphql';

interface BeehiveRef {
  uid: string
  apiary: {
    uid: string
  }
}

interface Store {
  Beehive: {
    listBeehivesFromApiary: BeehiveRef[]
  }
}

/**
 * Update Apollo store on new beehive created.
 * Should make the new item visible on the listing.
 *
 * @see https://www.apollographql.com/docs/react/caching/cache-interaction/#using-graphql-queries
 */
export function onCreateBeehive(
  store: ApolloCache<unknown>,
  beehive: BeehiveRef,
) {
  const query = ListBeehivesQuery;
  const variables = { apiaryUid: beehive.apiary.uid };

  // Attempt to read the data from the cache:
  const previousData = store.readQuery<Store>({ query, variables });

  if (!previousData) {
    // If no data was fetched yet, we don't need to do anything
    return;
  }

  const data = {
    ...previousData,
    Beehive: {
      ...previousData.Beehive,
      // Append the newly created beehive to the list:
      listBeehivesFromApiary: [...previousData.Beehive.listBeehivesFromApiary, beehive],
    },
  };

  // Write the data back to the cache:
  store.writeQuery({ query, data, variables });
}

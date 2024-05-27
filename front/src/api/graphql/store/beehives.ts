import { ApolloCache } from '@apollo/client';
import ListBeehivesQuery from '@graphql/query/beehive/ListBeehives.graphql';

interface ApiaryRef {
  uid: string
}

interface Store {
  Beehive: {
    listMyBeehives: ApiaryRef[]
  }
}

/**
 * Update Apollo store on new service created.
 * Should make the new item visible on the listing.
 *
 * @see https://www.apollographql.com/docs/react/caching/cache-interaction/#using-graphql-queries
 */
export function onCreateBeehive(
  store: ApolloCache<unknown>,
  beehive: ApiaryRef,
) {
  const query = ListBeehivesQuery;
  // Attempt to read the data from the cache:
  const previousData = store.readQuery<Store>({ query });

  if (!previousData) {
    // If no data was fetched yet, we don't need to do anything
    return;
  }

  const data = {
    ...previousData,
    Beehive: {
      ...previousData.Beehive,
      // Append the newly created service to the list:
      list: [...previousData.Beehive.listMyBeehives, beehive],
    },
  };

  // Write the data back to the cache:
  store.writeQuery({ query, data });
}

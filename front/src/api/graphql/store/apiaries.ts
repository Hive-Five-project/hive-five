import { ApolloCache } from '@apollo/client';
import ListApiariesQuery from '@graphql/query/apiary/ListApiaries.graphql';

interface ApiaryRef {
  uid: string
}

interface Store {
  Apiary: {
    listMyApiaries: ApiaryRef[]
  }
}

/**
 * Update Apollo store on new service created.
 * Should make the new item visible on the listing.
 *
 * @see https://www.apollographql.com/docs/react/caching/cache-interaction/#using-graphql-queries
 */
export function onCreateApiary(
  store: ApolloCache<unknown>,
  apiary: ApiaryRef,
) {
  const query = ListApiariesQuery;
  // Attempt to read the data from the cache:
  const previousData = store.readQuery<Store>({ query });

  if (!previousData) {
    // If no data was fetched yet, we don't need to do anything
    return;
  }

  const data = {
    ...previousData,
    Apiary: {
      ...previousData.Apiary,
      // Append the newly created service to the list:
      listMyApiaries: [...previousData.Apiary.listMyApiaries, apiary],
    },
  };

  // Write the data back to the cache:
  store.writeQuery({ query, data });
}

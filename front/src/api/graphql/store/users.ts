import { ApolloCache } from '@apollo/client';
import ListUsersQuery from '@graphql/query/user/ListUsers.graphql';

interface UserRef {
  uid: string
}

interface Store {
  User: {
    list: UserRef[]
  }
}

/**
 * Update Apollo store on new user created.
 * Should make the new item visible on the listing.
 *
 * @see https://www.apollographql.com/docs/react/caching/cache-interaction/#using-graphql-queries
 */
export function onCreatedUser(
  store: ApolloCache<unknown>,
  user: UserRef,
) {
  const query = ListUsersQuery;
  // Attempt to read the data from the cache:
  const previousData = store.readQuery<Store>({ query });

  if (!previousData) {
    // If no data was fetched yet, we don't need to do anything
    return;
  }

  const data = {
    ...previousData,
    User: {
      ...previousData.User,
      // Append the newly created user to the list:
      list:  [...previousData.User.list, user],
    },
  };

  // Write the data back to the cache:
  store.writeQuery({ query, data });
}

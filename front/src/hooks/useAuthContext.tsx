import { createContext, PropsWithChildren, useCallback, useContext } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import CurrentUserQuery from '@graphql/query/user/CurrentUser.graphql';
import ApolloClient from '@app/api/apollo/client';

export interface UserProfile {
  uid: string
  email: string
  firstname: string
  lastname: string
  isAdmin: boolean
}

export interface AuthenticatedContext {
  authenticated: true
  profile: UserProfile
  isAdmin: boolean
}

export interface UnauthenticatedContext {
  authenticated: false
  profile: null
  isAdmin: false
}

type ContextProps = (AuthenticatedContext | UnauthenticatedContext) & {
  /** Executed after logout to clean the application state. */
  postLogout: () => void
  /** Executed after login to set up the application state with user context */
  postLogin: () => void
  /** True once the initial authentication call was made */
  initialized: boolean
};

const AuthContext = createContext<ContextProps>({
  authenticated: false,
  profile: null,
  postLogout: () => {},
  postLogin: () => {},
  initialized: false,
  isAdmin: false,
});

AuthContext.displayName = 'AuthContext';

interface Response {
  User: {
    me: UserProfile | null
  }
}

export function Provider({ children }: PropsWithChildren) {
  const { loading, error, data, refetch, networkStatus } = useQuery<Response>(CurrentUserQuery, {
    // https://www.apollographql.com/docs/react/data/queries/#inspecting-loading-states
    notifyOnNetworkStatusChange: true,
  });
  const initialized = !loading && !error && networkStatus !== NetworkStatus.refetch;

  const profile = data?.User.me ?? null;
  const authenticated = Boolean(profile) && initialized;

  const postLogin = useCallback(() => {
    refetch();
  }, [refetch]);

  const postLogout = useCallback(async () => {
    if (authenticated) {
      // Reset the Apollo cache on logout
      await ApolloClient.resetStore();
    }
  }, [authenticated]);

  return <AuthContext.Provider value={{
    ...(authenticated && profile ? {
      authenticated: true,
      profile,
      isAdmin: profile.isAdmin,
    } : {
      authenticated: false,
      profile: null,
      isAdmin: false,
    }),
    ...{
      postLogin,
      postLogout,
      initialized,
    },
  }}>
    {children}
  </AuthContext.Provider>;
}

Provider.displayName = 'AuthContext';

export function useAuthContext() {
  return useContext(AuthContext);
}

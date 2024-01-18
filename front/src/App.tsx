import { BrowserRouter, Routes } from 'react-router-dom';
import { renderRoutes } from '@app/router/router';
import routes from '@app/routes.ts';
import { ApolloProvider } from '@apollo/client';
import client from '@app/api/apollo/client';
import ErrorBoundary from '@app/components/ErrorBoundary';
import * as AuthContext from '@app/hooks/useAuthContext';
import * as UseFetch from 'use-http';
import AppConfig from '@app/AppConfig.ts';
import { theme, variantColorResolver } from '@app/theme';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@app/styles/global.scss';

export default function App() {
  return (
    <UseFetch.Provider url={AppConfig.API_HOST} options={{
      credentials: 'include',
    }}>
      <ApolloProvider client={client}>
        <AuthContext.Provider>
          <BrowserRouter>
            <ErrorBoundary>
              <MantineProvider theme={{...theme, variantColorResolver}}>
                <Routes>
                  {renderRoutes(routes)}
                </Routes>
              </MantineProvider>
            </ErrorBoundary>
          </BrowserRouter>
        </AuthContext.Provider>
      </ApolloProvider>
    </UseFetch.Provider>
  );
}

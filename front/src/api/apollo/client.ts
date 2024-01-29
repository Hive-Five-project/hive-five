import { ApolloClient, from, InMemoryCache, Operation, ServerError, ServerParseError } from '@apollo/client';
import { ErrorLink, ErrorResponse } from '@apollo/client/link/error';
import { AppGraphQLError, GraphQLErrorCodes } from '@app/api/errors/GraphQLErrorCodes';
import AppConfig from '@app/AppConfig';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import typePolicies from '@app/api/apollo/typePolicies';
import { isOfType } from '@app/utils/types';
import { GraphQLError } from 'graphql';
import { absoluteUrl } from '@app/router/generator';
import Logout from '@app/pages/Auth/Logout';

const batchLink = new BatchHttpLink({
  uri: AppConfig.API_HOST + '/graphql/batch',
  batchMax: 10,
  batchInterval: 20,
  credentials: 'include',
});

const errorLink = createGraphQLErrorLink();

const apolloClient = new ApolloClient({
  link: from([errorLink, batchLink]),
  cache: new InMemoryCache({
    typePolicies,
  }),
});

/**
 * Global error handling on GraphQL calls.
 * Formats violation errors in the console.
 * Handles special errors like 404 or 403 HTTP error code equivalents.
 *
 * @see https://www.apollographql.com/docs/link/links/error.html
 *
 * @returns {ErrorLink}
 */
function createGraphQLErrorLink() {
  return new ErrorLink(onError);
}

function onError({ graphQLErrors, networkError, operation }: ErrorResponse) {
  if (graphQLErrors) {
    // GraphQL's errors message catching
    // @ts-ignore
    graphQLErrors.forEach((graphQLError: AppGraphQLError) => {
      const { api_problem, message, path, code } = graphQLError;
      let formattedError = `[GraphQL error]: Message "${message}" at path "${path}"`;
      if (code) {
        formattedError += ` (code: ${code})`;
      }

      switch (code) {
      case GraphQLErrorCodes.INVALID_PAYLOAD:
        if (!api_problem) {
          break;
        }

        formattedError += ':';
          api_problem!.violations.forEach(({ type, propertyPath, title }) => {
            formattedError += `\n    - ✗ violation at path "${propertyPath}": "${title}" (code: "${type}")`;
          });

        // Just display the errors in the console, do not capture it in Sentry:
        return console.error(formattedError, graphQLErrors);

      case GraphQLErrorCodes.NOT_FOUND:
        return notFoundErrorHandler(operation, graphQLError);

      case GraphQLErrorCodes.FORBIDDEN:
      case GraphQLErrorCodes.ACCESS_DENIED:
        return forbiddenErrorHandler(operation, graphQLError);
      }

      // Capture non-handled errors:
      console.error(formattedError, graphQLErrors);
    });
  }

  if (networkError) {
    if (
      isOfType<ServerError | ServerParseError>(networkError, 'statusCode') &&
      networkError.statusCode === 401
    ) {
      // Allow a special handler to be registered on invalid auth:
      if (operation && operation.getContext()?.onUnauthorized) {
        // Execute specific callback on unauthorized if provided:
        const handled = operation.getContext()?.onUnauthorized(networkError.message, networkError);

        if (handled !== false) {
          // If the callback does not return false, we consider the error was handled:
          return console.warn(`[Network error]: Handled Unauthorized Error with message "${networkError.message}" with specific callback.`);
        }
      }

      console.warn('[Auth error] Expired JWT token. Disconnect.');

      logout();

      return;
    }

     
    console.error(`[Network error]: ${networkError}`);
  }
}

const notFoundErrorHandler = errorHandlerFactory('onNotFound', 'Not Found');
const forbiddenErrorHandler = errorHandlerFactory('onForbidden', 'Forbidden');

function errorHandlerFactory(
  contextKey: string,
  type: string,
) {
  return (
    operation: Operation,
    graphQLError: GraphQLError,
  ) => {
    const { message, path } = graphQLError;

    if (operation && operation.getContext()?.[contextKey]) {
      // Execute specific callback on 404 if provided:
      const handled = operation.getContext()?.[contextKey](message, graphQLError);

      if (handled !== false) {
        // If the callback does not return false, we consider the error was handled:
        return console.warn(`[GraphQL error]: Handled ${type} Error with message "${message}" at path "${path}"`);
      }
    }

    return console.error(`[GraphQL error]: Unhandled ${type} Error with message "${message}" at path "${path}"`);
  };
}

/**
 * Redirect to the logout page.
 */
function logout() {
  window.location.replace(absoluteUrl(Logout));
}

export default apolloClient;

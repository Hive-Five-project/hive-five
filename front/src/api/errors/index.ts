import { ApiProblemViolation, AppGraphQLError } from '@app/api/errors/GraphQLErrorCodes';
import { ltrimStr } from '@app/utils/strings';

/**
 * Find errors at given path from GraphQL error formatted as API Problem violations.
 *
 * @param {Array|null} graphQLErrors
 * @param {String} path
 * @param {String} prefix
 */
export function findErrorsAtPath(
  graphQLErrors: AppGraphQLError[] = [],
  path: string,
  prefix = 'payload.',
) {
  const errorsAtPath: string[] = [];

  (graphQLErrors || []).forEach((graphQLError) => {
    ((graphQLError.api_problem && graphQLError.api_problem.violations) || []).forEach(error => {
      if ((ltrimStr(error.propertyPath ?? '__root', prefix)) === path) {
        errorsAtPath.push(error.title);
      }
    });
  });

  return errorsAtPath;
}

/**
 * Gather errors by their path.
 *
 * @param {AppGraphQLError|null} graphQLErrors
 * @param {Function} transform Transforms the error. By default, to its title.
 * @param {String} prefix
 */
export function errorsByPath(
  graphQLErrors: AppGraphQLError[] = [],
  transform: ((e: ApiProblemViolation) => unknown) = e => e.title,
  prefix = 'payload.',
) {
  const errorsByPath = {};

  (graphQLErrors || []).forEach((graphQLError) => {
    ((graphQLError.api_problem && graphQLError.api_problem.violations) || []).forEach(error => {
      // Any type errors by type must be pushed or caught by graphQLErrors
      // @ts-ignore
      if (!errorsByPath[ltrimStr(error.propertyPath ?? '__root', prefix)]) {
        // @ts-ignore
        errorsByPath[ltrimStr(error.propertyPath ?? '__root', prefix)] = [];
      }

      // @ts-ignore
      errorsByPath[ltrimStr(error.propertyPath ?? '__root', prefix)].push(transform(error));
    });
  });

  return errorsByPath;
}

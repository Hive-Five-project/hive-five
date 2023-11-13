/**
 * Default handler for mutation error in components (usually with forms).
 */
// @ts-ignore
export function onMutateError(error) {
  if (error.graphQLErrors?.length > 0) {
    // graphQL errors are already handled & rendered
    return;
  }

  throw error;
}

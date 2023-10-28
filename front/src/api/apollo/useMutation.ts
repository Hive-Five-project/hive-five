import {
  ApolloCache,
  DefaultContext,
  DocumentNode,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  useMutation as useApolloMutation,
} from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useForbiddenHandler } from '@app/components/ErrorBoundary';

/**
 * Decorates Apollo's useMutation hook so a global onError logic is always called,
 * even in case of an error occurring during Apollo's cache update.
 */
export function useMutation<
  TData = unknown,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<unknown> = ApolloCache<unknown>,
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables, TContext>,
): MutationTuple<TData, TVariables, TContext, TCache> {
  const forbiddenHandler = useForbiddenHandler();

  const { update, context = {} as TContext } = options ?? {};
  delete options?.update;
  delete options?.context;

  // On GraphQL Forbidden error, show a Forbidden page
  (context as DefaultContext).onForbidden ??= forbiddenHandler;

  return useApolloMutation(mutation, {
    update: (...updateArgs) => {
      try {
        update && update(...updateArgs);
      } catch (updateError) {
        // throw even unknown type
        // @ts-ignore
        throw new MutationUpdateError(updateError);
      }
    },
    ...options,
    context,
  });
}

class MutationUpdateError extends Error {
  public name: string;
  public previous: Error;
  public stack?: string;

  constructor(previous: Error) {
    super(previous.message);

    this.name = this.constructor.name;
    this.stack = previous.stack;
    this.previous = previous;
  }
}

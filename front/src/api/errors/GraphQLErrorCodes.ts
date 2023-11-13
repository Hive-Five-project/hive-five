import { GraphQLError } from 'graphql';

export type AppGraphQLError = GraphQLError & {
  api_problem?: ApiProblemResponse
  message?: string
  path?: string[]
  code?: string
}

export interface ApiProblemResponse {
  violations: Array<ApiProblemViolation>
}

export interface ApiProblemViolation {
  type: string
  propertyPath: string | null
  title: string
  parameters: Record<string, string>
}

export enum GraphQLErrorCodes {
  /**
   * @see App\Infra\Bridge\GraphQL\Error\InvalidPayloadError
   */
  INVALID_PAYLOAD = 'INVALID_PAYLOAD',
  /**
   * @see App\Infra\Bridge\GraphQL\Error\ForbiddenError
   */
  FORBIDDEN = 'FORBIDDEN',
  /**
   * @see App\Infra\Bridge\GraphQL\Error\AccessDeniedError
   */
  ACCESS_DENIED = 'ACCESS_DENIED',
  /**
   * @see App\Infra\Bridge\GraphQL\Error\NotFoundError
   */
  NOT_FOUND = 'NOT_FOUND',
  /**
   * @see App\Infra\Bridge\GraphQL\Error\CustomUserError
   */
  CUSTOM_USER_ERROR = 'CUSTOM_USER_ERROR',
}

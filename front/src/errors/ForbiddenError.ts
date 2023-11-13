export default class ForbiddenError extends Error {
  // @ts-ignore
  private previous?: Error;

  constructor(message: string | null = null, previous?: Error) {
    super(message ?? 'Forbidden access');

    this.name = 'ForbiddenError';
    this.previous = previous;
  }
}

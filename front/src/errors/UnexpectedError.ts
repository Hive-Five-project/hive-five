export default class UnexpectedError extends Error {
  // @ts-ignore
  private previous?: Error;

  constructor(message: string | null, previous?: Error) {
    super(message ?? 'An unexpected error occurred');

    this.name = 'UnexpectedError';
    this.previous = previous;
  }
}

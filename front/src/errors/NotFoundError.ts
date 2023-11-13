export default class NotFoundError extends Error {
  // @ts-ignore
  private previous?: Error;

  constructor(message: string | null, previous?: Error) {
    super(message ?? 'Page not found');

    this.name = 'NotFound';
    this.previous = previous;
  }
}

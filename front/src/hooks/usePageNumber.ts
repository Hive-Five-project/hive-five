import { useSearchParams } from 'react-router-dom';

/**
 * Returns the current page number from the URL search params.
 */
export function usePageNumberFromQuery(queryParam = 'page'): number {
  const [searchParams] = useSearchParams();

  const parsed = parseInt(searchParams.get(queryParam) ?? '1');

  if (isNaN(parsed)) {
    return 1;
  }

  return Math.max(parsed, 1);
}

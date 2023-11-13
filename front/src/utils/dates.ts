/**
 * Format a date to a string using the French locale.
 */
export function formatDate(date: Date|string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return Intl.DateTimeFormat('fr').format(date);
}

export function dateIsoStringsComparator(): (a: string, b: string) => number {
  return (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime();
}

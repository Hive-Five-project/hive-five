import { SortOrder } from '@app/hooks/useSortHook';

export function compareStrings(a: string, b: string, sortOrder: SortOrder) {
  return sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
}

export function compareNumbers(a: number, b: number, sortOrder: SortOrder) {
  return sortOrder === 'asc' ? a - b : b - a;
}

export function compareDates(a : Date | string, b: Date | string, sortOrder: SortOrder) {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();
  return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
}

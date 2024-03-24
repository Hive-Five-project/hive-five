import { useState } from 'react';

export type SortOrder = 'asc' | 'desc';

export function useSortHook(initialSortColumn = null) {
  const [sortColumn, setSortColumn] = useState<string | null>(initialSortColumn);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // @ts-ignore
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      return;
    }

    setSortColumn(column);
    setSortOrder('asc');
  };

  return { sortColumn, sortOrder, handleSort };
}

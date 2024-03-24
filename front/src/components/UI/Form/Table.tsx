import clsx from 'clsx';
import { SortOrder } from '@app/hooks/useSortHook';
import { Box } from '@mantine/core';

interface Props {
  headers: string[]
  rows: React.ReactNode[]
  onHeaderClick: (column: string) => void
  sortColumn: string | null
  sortOrder: SortOrder
  sortSettings: { [column: string]: boolean }
}

export default function Table({
  headers,
  rows,
  onHeaderClick,
  sortColumn,
  sortOrder,
  sortSettings,

}: Props) {

  return (

    <Box>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th className={clsx(sortSettings[header] && 'cursor-pointer')} key={header} onClick={() => sortSettings[header] && onHeaderClick(header)}>
                {header}{' '}
                {sortSettings[header] && sortColumn === header && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{rows.map((row) => row)}</tbody>
      </table>
    </Box>
  );
}

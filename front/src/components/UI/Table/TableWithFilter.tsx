import clsx from 'clsx';
import { SortOrder } from '@app/hooks/useSortHook.tsx';
import { Table } from '@mantine/core';

interface Props {
  headers: string[]
  rows: React.ReactNode[]
  onHeaderClick: (column: string) => void
  sortColumn: string | null
  sortOrder: SortOrder
  sortSettings: { [column: string]: boolean }
}

export default function TableWithFilter({
  headers,
  rows,
  onHeaderClick,
  sortColumn,
  sortOrder,
  sortSettings,

}: Props) {

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th
              className={clsx(sortSettings[header] && 'cursor-pointer')}
              key={header}
              onClick={() => sortSettings[header] && onHeaderClick(header)}
            >
              {header}{' '}
              {sortSettings[header] && sortColumn === header && (sortOrder === 'asc' ? '▲' : '▼')}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

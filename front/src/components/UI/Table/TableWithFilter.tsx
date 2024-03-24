import { SortOrder } from '@app/hooks/useSortHook.tsx';
import { Table } from '@mantine/core';
import { trans } from '@app/translations';

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
              style={sortSettings[header] ? { cursor: 'pointer' } : {}}
              key={header}
              onClick={() => sortSettings[header] && onHeaderClick(header)}
            >
              {trans('pages.admin.user.list.table.header'.concat('.', header))}{' '}
              {sortSettings[header] && sortColumn === header && (sortOrder === 'asc' ? '▲' : '▼')}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

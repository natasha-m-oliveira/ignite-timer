import { useTable } from 'react-table'

import { TableContainer } from './styles'

export interface Cell<T = any, D = object> {
  cell: {
    value: T
  }
  row: {
    original: D
  }
}

interface TableProps {
  columns: any[]
  data: any[]
}

export function Table({ columns, data }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    })

  return (
    <TableContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps()

            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...resetColumnProps } = column.getHeaderProps()

                  return (
                    <th key={key} {...resetColumnProps}>
                      {column.render('Header')}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)

            const { key, ...restRowProps } = row.getRowProps()

            return (
              <tr
                key={key}
                {...restRowProps}
                className="border-b border-gray-600"
              >
                {row.cells.map((cell) => {
                  const { key, ...restCelProps } = cell.getCellProps()

                  return (
                    <td key={key} {...restCelProps} className="py-4 px-3">
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </TableContainer>
  )
}

/* eslint-disable react/jsx-key */
import { useTable } from 'react-table'

import { TableContainer } from './styles'

export interface Cell<T = any> {
  cell: {
    value: T
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
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className="border-b border-gray-600">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="py-4 px-3">
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

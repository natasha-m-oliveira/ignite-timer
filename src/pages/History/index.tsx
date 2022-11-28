import { useEffect, useMemo, useState } from 'react'
import { Table, Cell } from '../../components/Table'
import { Status } from '../../components/Table/styles'
import { HistoryContainer } from './styles'

interface Task {
  name: string
  minutesAmount: number
  createdAt: Date | string
  status: string
}

export function History() {
  const [items, setItems] = useState<Task[]>([])
  const columns = useMemo(
    () => [
      {
        id: 'name',
        Header: 'Tarefa',
        accessor: 'name',
      },
      {
        id: 'minutesAmount',
        Header: 'Duração',
        accessor: 'minutesAmount',
      },
      {
        id: 'createdAt',
        Header: 'Início',
        accessor: 'createdAt',
      },
      {
        id: 'status',
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }: Cell<string>) => {
          return <Status variant="yellow">{value}</Status>
        },
      },
    ],
    [],
  )

  function getTasks() {
    setItems([
      {
        name: 'Tarefa',
        minutesAmount: 20,
        createdAt: new Date().toISOString(),
        status: 'Em adamento',
      },
    ])
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <Table columns={columns} data={items} />
    </HistoryContainer>
  )
}

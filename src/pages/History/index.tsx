import { useContext, useMemo } from 'react'
import { Table, Cell } from '../../components/Table'
import { Status } from '../../components/Table/styles'
import { CyclesContext, Cycle } from '../../contexts/CyclesContext'
import { HistoryContainer } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  const columns = useMemo(
    () => [
      {
        id: 'task',
        Header: 'Tarefa',
        accessor: 'task',
      },
      {
        id: 'minutesAmount',
        Header: 'Duração',
        accessor: 'minutesAmount',
      },
      {
        id: 'startDate',
        Header: 'Início',
        accessor: 'startDate',
        Cell: ({ cell: { value } }: Cell<Date>) => {
          return value.toISOString()
        },
      },
      {
        id: 'status',
        Header: 'Status',
        accessor: '',
        Cell: ({ row }: any) => {
          if (row?.original?.finishedDate) {
            return <Status variant="green">Concluído</Status>
          }
          if (row?.original?.interruptedDate) {
            return <Status variant="red">Interrompido</Status>
          }
          return <Status variant="yellow">Em andamento</Status>
        },
      },
    ],
    [],
  )

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <Table columns={columns} data={cycles} />
    </HistoryContainer>
  )
}

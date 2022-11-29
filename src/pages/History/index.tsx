import { useContext, useMemo } from 'react'
import { format, formatDistanceToNow } from 'date-fns'

import ptBR from 'date-fns/locale/pt-BR'

import { Table, Cell } from '../../components/Table'
import { Status } from '../../components/Table/styles'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer } from './styles'
import { Cycle } from '../../reducers/cycles/reducer'

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
        Cell: ({ cell: { value } }: Cell<number>) => {
          return `${value} minutos`
        },
      },
      {
        id: 'startDate',
        Header: 'Início',
        accessor: 'startDate',
        Cell: ({ cell: { value } }: Cell<Date>) => {
          const startDateRelativeToNow = formatDistanceToNow(new Date(value), {
            addSuffix: true,
            locale: ptBR,
          })
          const startDateFormatted = format(
            new Date(value),
            "d 'de' LLLL 'às' HH:mm'h'",
            { locale: ptBR },
          )
          return <p title={startDateFormatted}>{startDateRelativeToNow}</p>
        },
      },
      {
        id: 'status',
        Header: 'Status',
        accessor: '',
        Cell: ({ row: { original } }: Cell<undefined, Cycle>) => {
          if (original.finishedDate) {
            return <Status variant="green">Concluído</Status>
          }
          if (original.interruptedDate) {
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

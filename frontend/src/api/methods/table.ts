import { TableData } from '@/services/interfaces/table'
import { Method } from '@/constants/common'
import { Endpoints } from '@/api/endpoints'
import { Fetcher } from '@/api/fetcher'

export function getTableData (): Promise<TableData> {
  return Fetcher({
    url: `${Endpoints.table}`,
    method: Method.GET
  })
}

export function saveTableData (editedTable: TableData): Promise<TableData> {
  return Fetcher({
    url: `${Endpoints.table}`,
    method: Method.PUT,
    body: editedTable
  })
}

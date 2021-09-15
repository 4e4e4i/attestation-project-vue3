import { Ref } from '@/services/interfaces/utils'
import { TableData } from '@/services/interfaces/table'

type isFetchingTableType = Ref<boolean>
type isErrorType = Ref<Error | null>
type initialTableDataType = Ref<unknown | TableData>

interface TableService {
  isFetchingTable: isFetchingTableType,
  isError: isErrorType,
  initialTableData: initialTableDataType,
  methodsTableService: {
    fetchTableData: () => Promise<void>,
    saveTableData: (tableData: TableData) => Promise<void>
  }
}

export {
  isFetchingTableType,
  isErrorType,
  initialTableDataType,
  TableService
}
